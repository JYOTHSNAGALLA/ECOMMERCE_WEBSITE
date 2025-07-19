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
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';

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
        {/* ✅ Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ Protected routes */}
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/sell" element={<ProtectedRoute><ProductSellingPage handleAddToCart={handleAddToCart} /></ProtectedRoute>} />

        <Route path="/products" element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
          <Route
            index
            element={
              <CategoriesPage
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            }
          />
          <Route
            path=":category"
            element={
              <MultipleProductPage
                selectedCategory={selectedCategory}
                setSelectedProduct={setSelectedProduct}
              />
            }
          />
          <Route
            path=":category/:productId"
            element={<ProductSellingPage handleAddToCart={handleAddToCart} />}
          />
        </Route>

        <Route
          path="/products/all/:productId"
          element={<ProtectedRoute><ProductSellingPage handleAddToCart={handleAddToCart} /></ProtectedRoute>}
        />

        <Route
          path="/cart"
          element={<ProtectedRoute><CartPage productList={productList} /></ProtectedRoute>}
        />

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/search" element={<ProtectedRoute><SearchResultsPage /></ProtectedRoute>} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
