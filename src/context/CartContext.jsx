import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("fandomverse-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("fandomverse-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((items) => {
      const existingIndex = items.findIndex((item) => item.id === product.id);
      if (existingIndex >= 0) {
        return items.map((item, i) =>
          i === existingIndex ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...items, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((items) => items.filter((item) => item.id !== productId));
  };

  const updateQty = (productId, qty) => {
    if (qty < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((items) =>
      items.map((item) => (item.id === productId ? { ...item, qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * (item.qty || 1), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, total, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);