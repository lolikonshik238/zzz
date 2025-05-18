import "../assets/css/style.css";
import { NavLink } from "react-router-dom";
import { BASKET, CATALOG, MAINPAGE } from "../services/consts";
import { useState, useEffect } from "react";

function Header() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {});

  useEffect(() => {
    const handleStorageChange = () => {
      setCart(JSON.parse(localStorage.getItem('cart')) || {});
    };

    // Обновление при изменении storage в других вкладках
    window.addEventListener('storage', handleStorageChange);

    // Обновление при любом изменении localStorage (внутри этой вкладки)
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      originalSetItem.apply(this, arguments);
      if (key === 'cart') {
        handleStorageChange();
      }
    };

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  return (
    <div className="Header">
      <div className="footer">
        ©2025 present - All rights reserved <br />
        We are not responsible for any flaw
      </div>
      <nav className="navigation">
        <NavLink to={MAINPAGE} className={({ isActive }) => isActive ? "nav-text active" : "nav-text"}>
          Главная
        </NavLink>
        <NavLink to={CATALOG} className={({ isActive }) => isActive ? "nav-text active" : "nav-text"}>
          Каталог
        </NavLink>
        <NavLink to={BASKET} className={({ isActive }) => isActive ? "nav-text-korzina active" : "nav-text-korzina"}>
          Корзина (<span>{Object.values(cart).reduce((acc, item) => acc + item.quantity, 0)}</span>)
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;
