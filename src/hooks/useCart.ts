import { useState, useEffect, useCallback } from 'react';
import { Cart, CartItem, MenuItem } from '@/types';
import { toast } from 'sonner';

const CART_STORAGE_KEY = 'foodie_cart';

const getInitialCart = (): Cart => {
  if (typeof window === 'undefined') {
    return { items: [], restaurantId: null, restaurantName: null };
  }
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
  }
  
  return { items: [], restaurantId: null, restaurantName: null };
};

export const useCart = () => {
  const [cart, setCart] = useState<Cart>(getInitialCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const addItem = useCallback((menuItem: MenuItem, restaurantId: string, restaurantName: string) => {
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
  }, []);

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

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getTotalItems,
  };
};
