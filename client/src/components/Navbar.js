import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../App.css';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

const handleSearchSubmit = (e) => {
  e.preventDefault();
  if (searchTerm.trim() !== '') {
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  }
};

  return (
    <nav className="navbar">
      <div className="navbar-section navbar-left">
        <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="Logo" className="navbar-logo" />
        <span className="navbar-title">ShopMate</span>
      </div>

      <div className="navbar-section navbar-center">
  <form onSubmit={handleSearchSubmit} className="search-form">
    <input
      type="text"
      placeholder="Search category..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
    <button type="submit" className="search-button">
      <img src={`${process.env.PUBLIC_URL}/assets/search-icon.svg`} alt="Search" className="search-icon" />
    </button>
  </form>
</div>

      <div className="navbar-section navbar-right">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Products</NavLink>
        <NavLink
  to="/cart"
  className={({ isActive }) =>
    `nav-link cart-icon-link ${isActive ? "active-link" : ""}`
  }
>
  <div className="cart-icon-wrapper">
    <img src={`${process.env.PUBLIC_URL}/assets/cart-icon.svg`} alt="Cart" className="cart-icon" />
    {itemCount > 0 && <span className="cart-badge">{itemCount}</span>} {/* ✅ this is key */}
  </div>
</NavLink>

<NavLink
  to="/login"
  className={({ isActive }) =>
    `nav-link ${isActive ? "active-link" : ""}`
  }
>
  Login
</NavLink>

<NavLink
  to="/register"
  className={({ isActive }) =>
    `nav-link ${isActive ? "active-link" : ""}`
  }
>
  Register
</NavLink>

      </div>
    </nav>
  );
}

export default Navbar;
