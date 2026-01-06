import { useState, useEffect, useCallback } from 'react';
import { Cart, CartItem, MenuItem, Restaurant } from '@/types';
import { toast } from 'sonner';
import { CART_STORAGE_KEY, CART_EXPIRY_HOURS } from '@/constants';

interface CartWithTimestamp extends Cart {
  timestamp?: number;
}

const getInitialCart = (): Cart => {
  if (typeof window === 'undefined') {
    return { items: [], restaurantId: null, restaurantName: null };
  }
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const cartData: CartWithTimestamp = JSON.parse(stored);
      
      // Check cart expiry
      if (cartData.timestamp) {
        const hoursSinceLastUpdate = (Date.now() - cartData.timestamp) / (1000 * 60 * 60);
        if (hoursSinceLastUpdate > CART_EXPIRY_HOURS) {
          toast.info('Your cart has expired and was cleared');
          return { items: [], restaurantId: null, restaurantName: null };
        }
      }
      
      return {
        items: cartData.items,
        restaurantId: cartData.restaurantId,
        restaurantName: cartData.restaurantName,
      };
    }
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
  }
  
  return { items: [], restaurantId: null, restaurantName: null };
};

export const useCart = () => {
  const [cart, setCart] = useState<Cart>(getInitialCart);
  const [restaurantStatus, setRestaurantStatus] = useState<Restaurant | null>(null);

  useEffect(() => {
    try {
      const cartWithTimestamp: CartWithTimestamp = {
        ...cart,
        timestamp: Date.now(),
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartWithTimestamp));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // Helper function to check restaurant status
  const checkRestaurantStatus = useCallback((restaurant: Restaurant | null): boolean => {
    if (!restaurant) return true;
    
    if (!restaurant.isOpen) {
      toast.error(`${restaurant.name} is currently closed`);
      return false;
    }
    
    return true;
  }, []);

  const addItem = useCallback((
    menuItem: MenuItem, 
    restaurantId: string, 
    restaurantName: string,
    restaurant?: Restaurant
  ) => {
    // Check restaurant status before adding
    if (restaurant && !checkRestaurantStatus(restaurant)) {
      return;
    }

    setCart(prevCart => {
      // Check if adding from a different restaurant
      if (prevCart.restaurantId && prevCart.restaurantId !== restaurantId) {
        toast.error('Your cart contains items from another restaurant. Clear cart first.');
        return prevCart;
      }

      const existingItem = prevCart.items.find(item => item.menuItem.id === menuItem.id);

      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map(item =>
            item.menuItem.id === menuItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      toast.success(`${menuItem.name} added to cart`);

      return {
        items: [...prevCart.items, { menuItem, quantity: 1, restaurantId, restaurantName }],
        restaurantId,
        restaurantName,
      };
    });
    
    if (restaurant) {
      setRestaurantStatus(restaurant);
    }
  }, [checkRestaurantStatus]);

  const removeItem = useCallback((menuItemId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.menuItem.id !== menuItemId);
      
      if (newItems.length === 0) {
        return { items: [], restaurantId: null, restaurantName: null };
      }
      
      return { ...prevCart, items: newItems };
    });
  }, []);

  const updateQuantity = useCallback((menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(menuItemId);
      return;
    }

    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.map(item =>
        item.menuItem.id === menuItemId ? { ...item, quantity } : item
      ),
    }));
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setCart({ items: [], restaurantId: null, restaurantName: null });
    toast.success('Cart cleared');
  }, []);

  const getSubtotal = useCallback(() => {
    return cart.items.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
  }, [cart.items]);

  const getTotalItems = useCallback(() => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }, [cart.items]);

  const validateMinimumOrder = useCallback((minOrder: number): boolean => {
    const subtotal = getSubtotal();
    if (subtotal < minOrder) {
      toast.error(`Minimum order amount is ₹${minOrder}. Add ₹${minOrder - subtotal} more`);
      return false;
    }
    return true;
  }, [getSubtotal]);

  const isRestaurantClosed = useCallback((): boolean => {
    return restaurantStatus !== null && !restaurantStatus.isOpen;
  }, [restaurantStatus]);

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getTotalItems,
    validateMinimumOrder,
    isRestaurantClosed,
    restaurantStatus,
  };
};
