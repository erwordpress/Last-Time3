import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(product, opts = {}) {
    setItems(prev => {
      const existing = prev.find(it => it.id === product.id);
      if (existing) {
        return prev.map(it => it.id === product.id ? { ...it, qty: it.qty + (opts.qty || 1) } : it);
      }
      const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || null,
        qty: opts.qty || 1,
        meta: opts.meta || {},
      };
      return [...prev, item];
    });
  }

  function removeItem(id) {
    setItems(prev => prev.filter(it => it.id !== id));
  }

  function updateQty(id, qty) {
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, qty) } : it));
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
