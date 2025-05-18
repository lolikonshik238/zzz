import Header from "../components/Header.jsx";
import React, { useEffect, useState } from 'react';
import { getProducts } from "../services/api.js";
import axios from "axios";
import vector from "../assets/images/Vector.png"
axios.defaults.withCredentials = true;

function Catalog() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Букеты'); // Стартовая категория
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Просто меняем выбранную категорию
  };



useEffect(() => {
  const savedCart = JSON.parse(localStorage.getItem('cart'));
  if (savedCart) {
    setCart(savedCart); // Загружаем корзину из localStorage, которая уже включает изображения
  }
}, []);


const addToCart = (productId, quantity, image, name, description, price) => {
  const newCart = { ...cart };

  if (newCart[productId]) {
    newCart[productId].quantity += quantity;
  } else {
    newCart[productId] = {
      product_id: productId,   
      quantity,
      image,
      name,
      description,
      price
    };
  }

  setCart(newCart);
  localStorage.setItem('cart', JSON.stringify(newCart));
};



  


  
  
  



  return (
    <>
      <Header />
      <div className="html-css">
      <div className="jewerly">
        <h2>{selectedCategory}</h2>
        <div className="line"></div>
      </div>
      <div className="store-container">
        <aside className="sidebar">
          <ul>
            {['Букеты', 'Сладости', 'Подарки', 'Украшения', 'Разное'].map((category) => (
              <li 
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        <div className="products">
          {products.length > 0 ? (
            products
              .filter(product => product.category === selectedCategory) // Фильтрация товаров по категории
              .map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="icon-wrapper">
                    <button className="icon-wrapper-button" onClick={() => addToCart(product.id, 1, product.image, product.name, product.description, product.price)}>
                      <img src={vector} alt="" />
                    </button>
                  </div>
                  <div className="line-on-card"></div>
                  <img src={product.image || require("../assets/images/jew.png")} alt={product.name} className="product-card-img"/>
                  <h3>{product.name}</h3>
                  <p>{product.price} USD | {product.price * 521} ₸</p>
                  <a href="#">show similar</a>
                </div>
              ))
          ) : (
            <p>Товары загружаются...</p>
          )}
        </div>

        <div className="line-png"></div>

      </div>
      </div>
    </>
  );
}

export default Catalog;
