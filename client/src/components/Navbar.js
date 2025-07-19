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
  const [showDropdown, setShowDropdown] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    document.title = 'Shopora'; // ✅ Update tab title
  }, []);

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

  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest('.hamburger') && !e.target.closest('.mobile-menu')) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      window.addEventListener('click', closeMenu);
    }
    return () => {
      window.removeEventListener('click', closeMenu);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.avatar-toggle') && !e.target.closest('.avatar-menu')) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

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
      {/* Left: Hamburger & Logo */}
      <div className="navbar-left">
        {isLoggedIn && (
          <button className="hamburger" onClick={toggleMenu}>☰</button>
        )}
        <NavLink to="/" className="navbar-logo">
          <img
            src={`${process.env.PUBLIC_URL}/assets/logo.png`}
            alt="Shopora Logo"
            className="logo-img"
          />
          <span className="logo-text">Shopora</span>
        </NavLink>
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

      {/* Right: Cart and User */}
      <div className="navbar-right">
        {isLoggedIn && (
          <NavLink to="/cart" className="cart-icon-link">
            <div className="cart-icon-wrapper">
              <img
                src={`${process.env.PUBLIC_URL}/assets/cart-icon.svg`}
                alt="Cart"
                className="cart-icon"
              />
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </div>
          </NavLink>
        )}

        {isLoggedIn ? (
          <div className="avatar-container">
            <button className="avatar-toggle" onClick={toggleDropdown}>
              <div className="text-avatar">
                {userName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </button>
            {showDropdown && (
              <div className="avatar-menu">
                <p>Hello, {userName}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-links">
            <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Login</NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Register</NavLink>
          </div>
        )}
      </div>

      {/* Hamburger Menu Items (only for logged-in) */}
      {menuOpen && isLoggedIn && (
        <div className="mobile-menu show">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/products" className="nav-link">Products</NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
