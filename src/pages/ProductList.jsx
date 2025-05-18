import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getProducts = async () => {
  try {
    const response = await axios.get(' https://testappcrudifyex.pythonanywhere.com/api/v1/products');
    return response.data; // Данные продуктов
  } catch (error) {
    console.error('Ошибка при получении продуктов:', error);
    throw error;
  }
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {}); // Состояние корзины

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data); // Загрузка данных о товарах
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      }
    };
    fetchData();
  }, []);

useEffect(() => {
  const savedCart = JSON.parse(localStorage.getItem('cart'));
  if (savedCart) {
    setCart(savedCart); // Загружаем корзину из localStorage, которая уже включает изображения
  }
}, []);

// Обновление состояния корзины при добавлении нового товара
const addToCart = (productId, quantity, image) => {
  const newCart = { ...cart };
  newCart[productId] = { quantity, image };
  setCart(newCart);
  localStorage.setItem('cart', JSON.stringify(newCart));
};

  
  
  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart); // Загружаем корзину из localStorage, которая уже включает изображения
    }
  }, []);
  

  return (
    <div>
      <h2>Товары</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} — {product.price}₽
            {product.image && <img src={product.image} alt={product.name} />} {/* Проверка наличия изображения */}
            <button onClick={() => addToCart(product.id, 1, product.image)}>В корзину</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
