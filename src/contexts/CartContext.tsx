import React, { createContext, useContext, ReactNode } from 'react';
import { useCart } from '@/hooks/useCart';
import { Cart, MenuItem, Restaurant } from '@/types';

interface CartContextType {
  cart: Cart;
  addItem: (menuItem: MenuItem, restaurantId: string, restaurantName: string, restaurant?: Restaurant) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
  validateMinimumOrder: (minOrder: number) => boolean;
  isRestaurantClosed: () => boolean;
  restaurantStatus: Restaurant | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const cartHook = useCart();

  return (
    <CartContext.Provider value={cartHook}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
