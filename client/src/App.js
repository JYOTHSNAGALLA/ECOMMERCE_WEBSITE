import './App.css';
import { useState } from 'react';
import ProductSellingPage from './pages/ProductSellingPage';
import Navbar from './components/Navbar';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CategoriesPage from './pages/CategoriesPage';
import MultipleProductPage from './pages/MutipleProductPage'; // ✅ fixed spelling
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchResultsPage from "./pages/SearchResultsPage";
import CheckoutPage from './pages/checkoutPage';
function App() {
  const [productCount, setProductCount] = useState(0);
  const [productList, setProductList] = useState([]); // ✅ should hold product objects
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Add product to cart
  const handleAddToCart = (product) => {
    setProductList(prev => [...prev, product]);
    setProductCount(prev => prev + 1);
  };

  return (
    <div className="App">
      <Outlet />
      <Navbar productCount={productCount} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/sell" element={<ProductSellingPage handleAddToCart={handleAddToCart} />} />

        <Route path="/products" element={<Outlet />}>
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
            element={
              <ProductSellingPage
                handleAddToCart={handleAddToCart}
              />
            }
          />
        </Route>

        <Route
          path="/products/all/:productId"
          element={<ProductSellingPage handleAddToCart={handleAddToCart} />}
        />

        <Route
          path="/cart"
          element={<CartPage productList={productList} />}
        />
         <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;
