'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  freeItemsCount: number;
  itemsNeededForPromo: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'manly_aura_cart_v1';
const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 79;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to localStorage:', e);
      }
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existing = prevItems.find(item => item.product.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }
      return [...prevItems, { product, quantity: Math.min(product.stock, quantity) }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(item.product.stock, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculations
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Raw Subtotal (MRP or list price)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Promotional Logic: BUY 3 GET 1 FREE (For every 4 items, 1 lowest priced item is free)
  // Expand all items into single unit prices
  const allUnitPrices: number[] = [];
  items.forEach(item => {
    for (let i = 0; i < item.quantity; i++) {
      allUnitPrices.push(item.product.price);
    }
  });

  // Sort ascending: lowest price first
  allUnitPrices.sort((a, b) => a - b);

  // Number of free items earned
  const freeItemsCount = Math.floor(totalItems / 4);
  const itemsNeededForPromo = (4 - (totalItems % 4)) % 4;

  // The discount is the sum of the lowest `freeItemsCount` items
  let discount = 0;
  for (let i = 0; i < freeItemsCount; i++) {
    discount += allUnitPrices[i] || 0;
  }

  const effectivePriceAfterDiscount = Math.max(0, subtotal - discount);

  // Shipping calculation: Free if >= 999
  const shipping = effectivePriceAfterDiscount >= FREE_SHIPPING_THRESHOLD || totalItems === 0
    ? 0
    : STANDARD_SHIPPING_FEE;

  const total = totalItems === 0 ? 0 : effectivePriceAfterDiscount + shipping;

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - effectivePriceAfterDiscount);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        shipping,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        freeItemsCount,
        itemsNeededForPromo,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
