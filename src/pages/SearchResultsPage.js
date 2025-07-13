import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { products } from "../data/MultipleProductData";
import "../App.css";

function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q")?.toLowerCase();

  const filteredProducts = Object.values(products)
    .flat()
    .filter((product) => product.name.toLowerCase().includes(query));

  const handleProductClick = (category, product) => {
    navigate(`/products/${product.category}/${product.id}`,{ state: { product } });
  };

  return (
    <div className="search-results-page">
      <h2 className="search-heading">
        Search Results for: <span>"{query}"</span>
      </h2>
      {filteredProducts.length === 0 ? (
        <p className="no-results">No products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.category, product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-card-image"
              />
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="price">₹{product.price}</p>
              <button className="buy-now-button">View Product</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
