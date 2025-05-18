
import "./assets/css/style.css"
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import ProductList from './pages/ProductList';
// import Cart from './pages/Cart';

// // Предположим, что у нас есть товары заранее
// const mockProducts = [
//   { id: 1, name: 'Товар 1', price: 100 },
//   { id: 2, name: 'Товар 2', price: 200 },
// ];

// const App = () => {
//   const [cart, setCart] = useState({});

//   return (
//     <Router>
//       <nav>
//         <Link to="/">Главная</Link> | <Link to="/cart">Корзина</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<ProductList products={mockProducts} onCartUpdate={setCart} />} />
//         <Route path="/cart" element={<Cart />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
