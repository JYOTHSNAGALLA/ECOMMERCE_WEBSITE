import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (token && userData) {
      setIsLoggedIn(true);
      setUserName(userData.name || 'User');
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <nav className="navbar">
      {/* Left Section: Hamburger + Logo + Title */}
      <div className="navbar-left">
        <button className="hamburger" onClick={toggleMenu}>☰</button>
        <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="Logo" className="navbar-logo" />
        <span className="navbar-title">ShopMate</span>
      </div>

      {/* Center: Search */}
      <div className="navbar-center">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <img
              src={`${process.env.PUBLIC_URL}/assets/search-icon.svg`}
              alt="Search"
              className="search-icon"
            />
          </button>
        </form>
      </div>

      {/* Right: Avatar, Cart, Menu */}
      <div className="navbar-icons">
        <span className="nav-user">👤</span>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `nav-link cart-icon-link ${isActive ? 'active-link' : ''}`
          }
        >
          <div className="cart-icon-wrapper">
            <img
              src={`${process.env.PUBLIC_URL}/assets/cart-icon.svg`}
              alt="Cart"
              className="cart-icon"
            />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </div>
        </NavLink>
      </div>

      {/* Navigation links: shown on desktop or when menuOpen on mobile */}
      <div className={`navbar-links ${menuOpen ? 'show-menu' : ''}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
          Products
        </NavLink>
        {isLoggedIn ? (
          <>
            <span className="nav-link user-name">👤 {userName}</span>
            <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
              Login
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
