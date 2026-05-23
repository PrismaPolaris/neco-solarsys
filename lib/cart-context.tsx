'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems(prevItems => {
      const existing = prevItems.find(i => i.id === item.id);
      if (existing) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setItems(prevItems =>
        prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, total, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
