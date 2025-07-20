import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { cartItems } = useCart();
  const { user, logout, setUser } = useAuth(); // Ensure useAuth provides setUser
  const navigate = useNavigate();

  const isLoggedIn = !!user;
  const userName = user?.name || 'User';
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    document.title = 'Shopora';

    // Check localStorage for login on mount (if not already in context)
    const storedUser = localStorage.getItem('userData');
    if (!user && storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Update auth context from storage
      } catch (e) {
        console.error('Invalid user data in localStorage');
      }
    }
  }, []);

  // Close hamburger on outside click
  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest('.hamburger') && !e.target.closest('.mobile-menu')) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [menuOpen]);

  // Close avatar dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.avatar-toggle') && !e.target.closest('.avatar-menu')) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    logout(); // Clear auth context
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
      {/* Left: Logo & Hamburger */}
      <div className="navbar-left">
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <NavLink to="/" className="navbar-logo">
          <img
            src={`${process.env.PUBLIC_URL}/assets/logo.png`}
            alt="Shopora Logo"
            className="logo-img"
          />
          <span className="logo-text">Shopora</span>
        </NavLink>
      </div>

      {/* Center: Search bar */}
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

      {/* Right: Cart and Avatar OR Login/Register */}
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
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

            <div className="avatar-container">
              <button className="avatar-toggle" onClick={() => setShowDropdown(!showDropdown)}>
                <div className="text-avatar">
                  {userName?.charAt(0).toUpperCase()}
                </div>
              </button>
              {showDropdown && (
                <div className="avatar-menu">
                  <p>Hello, {userName}</p>
                  <NavLink to="/cart">Cart ({itemCount})</NavLink>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="auth-links">
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <NavLink to="/register" className="nav-link">Register</NavLink>
          </div>
        )}
      </div>

      {/* Hamburger Dropdown */}
      {menuOpen && (
        <div className="mobile-menu show">
          <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>Products</NavLink>
          {isLoggedIn ? (
            <NavLink to="#" className="nav-link" onClick={handleLogout}>Logout</NavLink>
          ) : (
            <>
              <NavLink to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink to="/register" className="nav-link" onClick={() => setMenuOpen(false)}>Register</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
