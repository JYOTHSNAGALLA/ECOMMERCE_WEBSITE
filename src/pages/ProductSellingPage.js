import { useEffect, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { getProductsFromCategory } from "../data/MultipleProductData";
import "../App.css";
import { useCart } from "../context/CartContext";

function ProductSellingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { product } = location.state || {};

  const { category, productId } = location.pathname
    .split("/")
    .filter((part) => part !== "");

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [frequentlyBought, setFrequentlyBought] = useState([]);

  const handleAdd = () => {
    addToCart(product);
    navigate("/cart");
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  useEffect(() => {
    const products = getProductsFromCategory(category);
    const filteredProducts = products.filter((p) => p.id !== productId);
    setRelatedProducts(filteredProducts.slice(0, 4)); // 4 related products
    setFrequentlyBought(filteredProducts.slice(0, 2)); // first 2 as frequently bought
  }, [category, productId]);

  const handleProductClick = (relatedProduct) => {
    navigate(`/products/${category}/${relatedProduct.id}`, {
      state: { product: relatedProduct },
    });
  };

  if (!product) {
    return <div className="no-results">Product not found.</div>;
  }

  return (
    <div className="selling-page">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <NavLink to="/">Home</NavLink>{" "}
        <NavLink to="/products">Categories</NavLink>{" "}
        <NavLink to={`/products/${category}`}>{category}</NavLink>{" "}
        <span>{product.name}</span>
      </div>

      {/* Main Product */}
      <div className="product-sell-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-sell-image"
        />
        <div className="product-sell-info">
          <h1 className="product-sell-title">{product.name}</h1>
          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-text">4.5 (120 reviews)</span>
          </div>
          <p className="product-sell-description">{product.description}</p>
          <p className="product-sell-price">₹{product.price.toFixed(2)}</p>
          <div className="product-buttons">
            <button className="add-all-btn" onClick={handleAdd}>
              Add to Cart
            </button>
            <button className="buy-now-button" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together */}
      {frequentlyBought.length > 0 && (
        <div className="frequently-bought">
          <h3>Frequently Bought Together</h3>
          <div className="frequently-bought-grid">
            {frequentlyBought.map((item, index) => (
              <div key={item.id} className="frequently-bought-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="frequently-bought-image"
                />
                <p>{item.name}</p>
                <p className="price">₹{item.price.toFixed(2)}</p>
                {index < frequentlyBought.length - 1 && (
                  <span className="plus-sign">+</span>
                )}
              </div>
            ))}
          </div>
          <button
            className="add-all-btn"
            onClick={() => {
              frequentlyBought.forEach((item) => addToCart(item));
              navigate("/cart");
            }}
          >
            Add All to Cart
          </button>
        </div>
      )}

      {/* Customer Reviews */}
      <div className="customer-reviews">
        <h3>Customer Reviews</h3>
        <div className="review">
          <div className="review-header">
            <span className="stars">★★★★★</span>
            <span className="review-title">Great Product!</span>
          </div>
          <p className="review-body">
            Really loved the quality and fit. Worth every penny!
          </p>
          <p className="review-author">— Priya S., June 10, 2025</p>
        </div>
        <div className="review">
          <div className="review-header">
            <span className="stars">★★★★☆</span>
            <span className="review-title">Good, but could be better</span>
          </div>
          <p className="review-body">
            The product is good, but delivery took longer than expected.
          </p>
          <p className="review-author">— Arjun K., June 5, 2025</p>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h3>Related Products</h3>
          <div className="product-grid">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="product-card"
                onClick={() => handleProductClick(relatedProduct)}
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="product-card-image"
                />
                <h3 className="product-title">{relatedProduct.name}</h3>
                <p className="product-description">
                  {relatedProduct.description}
                </p>
                <p className="price">₹{relatedProduct.price.toFixed(2)}</p>
                <button
                  className="buy-now-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(relatedProduct);
                  }}
                >
                  View Product
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductSellingPage;
