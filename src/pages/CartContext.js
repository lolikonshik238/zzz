import React, { createContext, useContext, useState } from 'react';

// Создаем контекст корзины
const CartContext = createContext();

// Провайдер контекста корзины
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  // Обновление корзины
  const updateCart = (newCart) => {
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Хук для доступа к корзине
export const useCart = () => {
  return useContext(CartContext);
};
