import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => setCart((items) => [...items, product]);
  const removeFromCart = (index) => setCart((items) => items.filter((_, i) => i !== index));
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);