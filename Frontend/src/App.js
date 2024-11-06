import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProductCatalog from './components/ProductCatalog';
import ProductPage from './components/ProductPage';
import AREquipment from './components/AREquipment';
import Home from './components/Home';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Orders from './components/Orders';
import HeaderFooter from './components/HeaderFooter';
import OrderConfirmation from './components/OrderConfirmation';

function App() {
  const [wishlist, setWishlist] = useState([]);

  return (
    <Router>
      <HeaderFooter wishlist={wishlist} setWishlist={setWishlist}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ProductCatalog" element={<ProductCatalog wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/ar-equipment" element={<AREquipment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </HeaderFooter>
    </Router>
  );
}

export default App;
