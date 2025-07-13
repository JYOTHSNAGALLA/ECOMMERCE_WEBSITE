import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { products } from "../data/MultipleProductData";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const [randomProducts, setRandomProducts] = useState([]);
  const MAX_PRODUCTS_TO_SHOW = 8; // Limit to 8 random products

  useEffect(() => {
    // Combine all products from all categories into one array
    const allProducts = Object.keys(products).flatMap((category) =>
      products[category].map((product) => ({ ...product, category }))
    );

    // Shuffle the products array
    const shuffledProducts = allProducts.sort(() => Math.random() - 0.5);

    // Take up to MAX_PRODUCTS_TO_SHOW products
    setRandomProducts(shuffledProducts.slice(0, MAX_PRODUCTS_TO_SHOW));
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h2>Season Sale</h2>
          <h1>UP TO 70% OFF - ALL CATEGORIES</h1>
          <div className="hero-buttons">
            <NavLink to="/products" className="btn-primary">
              Shop All Categories
            </NavLink>
            <NavLink to="/products" className="btn-secondary">
              Explore More
            </NavLink>
          </div>
        </div>
        <img src={`${process.env.PUBLIC_URL}/assets/mens-hero.jpeg`} alt="Hero" className="hero-image" />
      </div>

      {/* Info Bar */}
      <div className="info-bar">
        <span>🚚 Free Shipping</span>
        <span>💳 Secure Payment</span>
        <span>💰 100% Money Back</span>
        <span>📞 Online Support</span>
      </div>

      {/* Random Products Section */}
      <div className="products-section">
        <h2 className="products-title">Explore Our Products</h2>
        <div className="products-grid">
          {randomProducts.map((product) => (
            <div
              key={`${product.category}-${product.id}`}
              className="product-card"
              onClick={() =>
                navigate(`/products/${product.category}/${product.id}`, {
                  state: { product },
                })
              }
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-title">{product.name}</h3>
              <p className="price">₹{product.price.toFixed(2)}</p>
              <button
                className="btn-cart"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/products/${product.category}/${product.id}`, {
                    state: { product },
                  });
                }}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;