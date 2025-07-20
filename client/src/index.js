import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter basename="/">
       <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);

// Optional performance reporting
reportWebVitals();
