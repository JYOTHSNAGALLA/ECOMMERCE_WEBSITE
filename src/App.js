import './App.css';
import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import ProtectedRoute from './ProtectedRoute';

import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CategoriesPage from './pages/CategoriesPage';
import MultipleProductPage from './pages/MutipleProductPage';
import ProductSellingPage from './pages/ProductSellingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchResultsPage from "./pages/SearchResultsPage";
import CheckoutPage from './pages/checkoutPage';

function App() {
  const [productCount, setProductCount] = useState(0);
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    setProductList(prev => [...prev, product]);
    setProductCount(prev => prev + 1);
  };

  return (
    <div className="App">
      <Navbar productCount={productCount} />

      <Routes>
  {/* Public */}
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />

  {/* Protected */}
  <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
    <Route path="/" element={<HomePage />} />
    <Route path="/sell" element={<ProductSellingPage handleAddToCart={handleAddToCart} />} />
    <Route path="/products" element={
      <CategoriesPage
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    } />
    <Route path="/products/:category" element={
      <MultipleProductPage
        selectedCategory={selectedCategory}
        setSelectedProduct={setSelectedProduct}
      />
    } />
    <Route path="/products/:category/:productId" element={
      <ProductSellingPage handleAddToCart={handleAddToCart} />
    } />
    <Route path="/products/all/:productId" element={
      <ProductSellingPage handleAddToCart={handleAddToCart} />
    } />
    <Route path="/cart" element={<CartPage productList={productList} />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/search" element={<SearchResultsPage />} />
  </Route>
</Routes>


      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
