import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>/
    <BrowserRouter basename={process.env.PUBLIC_URL}> {/* ✅ Required for GitHub Pages */}
      <CartProvider> {/* ✅ Needed if you're using Cart context */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Optional performance reporting
reportWebVitals();
