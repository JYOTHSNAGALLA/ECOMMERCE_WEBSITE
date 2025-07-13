import { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { getProductsFromCategory } from "../data/MultipleProductData";
import "../App.css";

function MultipleProductPage({ setSelectedProduct }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [sortOption, setSortOption] = useState("default");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedProducts = getProductsFromCategory(category);
    if (!fetchedProducts || fetchedProducts.length === 0) {
      setError("No products found for this category.");
      setProducts([]);
      setFilteredProducts([]);
    } else {
      setError(null);
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    }
  }, [category]);

  useEffect(() => {
    let updatedProducts = [...products];

    updatedProducts = updatedProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortOption === "price-low-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      updatedProducts.sort((a, b) => b.name.localeCompare(b.name));
    }

    setFilteredProducts(updatedProducts);
  }, [priceRange, sortOption, products]);

  const handlePriceFilterChange = (e) => {
    const [min, max] = e.target.value.split("-").map(Number);
    setPriceRange([min, max || Infinity]);
  };

  if (error) {
    return (
      <div className="products-page">
        <div className="breadcrumbs">
          <NavLink to="/">Home</NavLink> <NavLink to="/products">Categories</NavLink> <span>{category}</span>
        </div>
        <p className="no-results">{error}</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="breadcrumbs">
        <NavLink to="/">Home</NavLink> <NavLink to="/products">Categories</NavLink>  <span>{category}</span>
      </div>
      <h2 className="products-heading">{category} Products</h2>
      <div className="filters">
        <div className="filter-section">
          <label htmlFor="price-range">Price Range:</label>
          <select id="price-range" onChange={handlePriceFilterChange}>
            <option value="0-Infinity">All Prices</option>
            <option value="0-1000">Under ₹1000</option>
            <option value="1000-5000">₹1000 - ₹5000</option>
            <option value="5000-20000">₹5000 - ₹20000</option>
            <option value="20000-Infinity">Above ₹20000</option>
          </select>
        </div>
        <div className="filter-section">
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" onChange={(e) => setSortOption(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>
      </div>
      {filteredProducts.length === 0 ? (
        <p className="no-results">No products found in this price range.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => {
                setSelectedProduct(product);
                navigate(`/products/${category}/${product.id}`, { state: { product } });
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-card-image"
              />
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="price">₹{product.price}</p>
              <button
                className="buy-now-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(product);
                  navigate(`/products/${category}/${product.id}`, { state: { product } });
                }}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultipleProductPage;