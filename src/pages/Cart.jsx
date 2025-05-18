import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart); // Загружаем корзину из localStorage, которая уже включает изображения
    }
  }, []);

  return (
    <div>
      <h1>Корзина</h1>
      {Object.keys(cart).length === 0 ? (
        <p>Корзина пуста.</p>
      ) : (
        <ul>
          {Object.entries(cart).map(([productId, { quantity, price, image }], index) => (
            <li key={`${productId}_${index}`}>
              Продукт ID: {productId}, Количество: {quantity}, Цена: {price}₽
              {image ? <img src={image} alt={`Продукт ${productId}`} /> : <img src="default-image-url.png" alt="Нет изображения" />}
            </li>
          ))}

        </ul>
      )}
    </div>
  );
};


export default Cart;
