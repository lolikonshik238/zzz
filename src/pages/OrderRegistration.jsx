import Header from "../components/Header";
import facebook from "../assets/images/facebook.png";
import instagram from "../assets/images/instagram.png";
import telegram from "../assets/images/telegram.png";
import twitter from "../assets/images/twitter-x.png";
import telephone from "../assets/images/telephone.png";
import youtube from "../assets/images/youtube.png";
import { TOMAIN } from "../services/consts";
import { CreateOrder } from "../services/api";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function OrderRegistration(){
  const navigate = useNavigate();
  const [cart, setCart] = useState({});

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    city: '',
    address: '',
    payment_method: 'kaspi',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка заполненности полей (опционально — required в input тоже есть)
    if (!formData.name || !formData.phone_number || !formData.city || !formData.address) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    // Проверка, что корзина не пустая
    if (Object.keys(cart).length === 0) {
      alert('Корзина пуста. Добавьте товары для оформления заказа.');
      return;
    }

    const items = Object.values(cart).map(item => ({
      product: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      ...formData,
      items,
    };

    try {
      const result = await CreateOrder(orderData);
      alert('Заказ успешно оформлен!');

      localStorage.removeItem('cart'); // очистить корзину из localStorage
      setCart({}); // очистить состояние корзины

      navigate(TOMAIN); // перейти на главную (или другую страницу)
    } catch (err) {
      console.error('Ошибка при оформлении заказа:', err);
      alert('Ошибка при оформлении заказа');
    }
  };

  return (
    <>
      <Header />
      <div className="Order-background">
        <div className="jewerly">
          <h2>Оформление</h2>
          <div className="line"></div>
        </div>
        <div className="form-container">
          <h2>Для оформления введите свои данные</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Имя" onChange={handleChange} required />
            <input type="text" name="phone_number" placeholder="Телефон" onChange={handleChange} required />
            <input type="text" name="city" placeholder="Город" onChange={handleChange} required />
            <input type="text" name="address" placeholder="Адрес" onChange={handleChange} required />
            <select className="payment_method" onChange={handleChange} value={formData.payment_method}>
              <option value="kaspi">Kaspi Gold</option>
              <option value="cash">Наличными курьеру</option>
            </select>
            <button type="submit" className="button-submit">Оформить заказ</button>
          </form>
        </div>
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
      </div>
      <div className="line-bottom"></div>
      <div className="romb"></div>
    </>
  );
}

export default OrderRegistration;
