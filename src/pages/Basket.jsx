import Header from "../components/Header.jsx";
import { getProducts } from "../services/api.js";
import { getCartProducts } from "../services/api.js";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import facebook from "../assets/images/facebook.png";
import instagram from "../assets/images/instagram.png";
import telegram from "../assets/images/telegram.png";
import twitter from "../assets/images/twitter-x.png";
import telephone from "../assets/images/telephone.png";
import youtube from "../assets/images/youtube.png";
import plus from "../assets/images/add.svg";
import minus from "../assets/images/minus.svg";
import trash from "../assets/images/trash.png";
import { CATALOG, ORDERREGISTRATION } from "../services/consts";
import Catalog from "./Catalog.jsx";

function Basket() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem('cart'));
      if (savedCart) {
        setCart(savedCart); // Загружаем корзину из localStorage, которая уже включает изображения
      }
    }, []);
  
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
  

  const increaseQuantity = (id) => {
  setCart(prevCart => {
    const updatedItem = {
      ...prevCart[id],
      quantity: prevCart[id].quantity + 1
    };
    const updatedCart = {
      ...prevCart,
      [id]: updatedItem
    };
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // не забудь сохранять!
    return updatedCart;
  });
};
const decreaseQuantity = (id) => {
  setCart(prevCart => {
    const currentQty = prevCart[id].quantity;
    if (currentQty <= 1) return prevCart; // не уменьшаем ниже 1
    const updatedItem = {
      ...prevCart[id],
      quantity: currentQty - 1
    };
    const updatedCart = {
      ...prevCart,
      [id]: updatedItem
    };
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
  });
};
const removeProduct = (id) => {
  setCart(prevCart => {
    const updatedCart = { ...prevCart };
    delete updatedCart[id];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
  });
};





  return (
    <>
      <Header />
      <div className="html-css">
        <div className="jewerly">
            <h2>Корзина</h2>
            <div className="line"></div>
        </div>
        <div className="basket-container">
            <aside className="sidebar-basket">
            <ul>
                <li className="image-basket"><img src={facebook} alt="" /></li>
                <li className="image-basket"><img src={youtube} alt="" /></li>
                <li className="image-basket"><img src={instagram} alt="" /></li>
                <li className="image-basket"><img src={telegram} alt="" /></li>
                <li className="image-basket"><img src={twitter} alt="" /></li>
                <li className="image-basket"><img src={telephone} alt="" /></li>
                <p className="info-basket">info</p>
            </ul>
            
            </aside>

            <div className="products-basket">
              {Object.entries(cart).length > 0 ? (
                Object.entries(cart).map(([productId, { quantity, price, name, description, image, product }]) => (
                  <div className="basket-card" key={productId}>
                    <img
                      src={image || require("../assets/images/jew.png")}
                      alt={name}
                      className="image-container"
                    />
                    <div className="basket-card-content">
                      <h3>{name}</h3>
                      <p>{description}</p>
                      <div className="quantity">
                        <button onClick={() => decreaseQuantity(productId)}>
                          <img src={minus} alt="minus" />
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => increaseQuantity(productId)}>
                          <img src={plus} alt="plus" />
                        </button>
                      </div>
                    </div>
                    <div className="basket-price-remove">
                      <h3>{(price * quantity).toFixed(2)} KZT</h3>
                      <img
                        src={trash}
                        alt="Удалить"
                        className="trash"
                        onClick={() => removeProduct(productId)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>Товары загружаются...</p>
              )}
            </div>

            <div className="cart-summary">
              <h2>Содержание <span>{Object.values(cart).reduce((acc, item) => acc + item.quantity, 0)}</span></h2>
              <ul>
                {Object.entries(cart).map(([productId, { name, quantity, price }]) => (
                  <li key={productId}>
                    <span>{name} x{quantity}</span>
                    <span>{(price * quantity).toFixed(2)} KZT</span>
                  </li>
                ))}
              </ul>
              <div className="total">
                <strong>Итого</strong> 
                <span>
                  {Object.values(cart)
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)} KZT 
                </span>
              </div>
              <Link to={ORDERREGISTRATION}>
                <button className="checkout-button">Оформить</button>
              </Link>
              <Link to={CATALOG}>
                <div className="view-more">посмотреть еще</div>
              </Link>
            </div>


            <div className="line-bottom"></div>
            <div className="romb"></div>
        </div>
      </div>
    </>
  );
}

export default Basket;
