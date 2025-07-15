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
      {/* Left: Hamburger (only after login) & Logo */}
      <div className="navbar-left">
        {isLoggedIn && (
          <button className="hamburger" onClick={toggleMenu}>☰</button>
        )}
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

      {/* Right: Cart and User Details */}
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
          <div className="user-dropdown-wrapper">
            <span className="nav-user" onClick={toggleDropdown}>👤</span>
            {showDropdown && (
              <div className="user-dropdown">
                <p className="user-name">Hello, {userName}</p>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
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

      {/* Hamburger Menu Items (visible only after login) */}
      {menuOpen && isLoggedIn && (
        <div className="mobile-menu show">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Products</NavLink>
          <p className="nav-link">👤 {userName}</p>
          <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
