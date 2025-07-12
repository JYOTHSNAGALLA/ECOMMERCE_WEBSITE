import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getCategoryData from "../data/CategoryData";
import { getProductsFromCategory } from "../data/MultipleProductData";
import "../App.css";

function CategoriesPage({ setSelectedCategory }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const data = getCategoryData();
    setCategories(data);
    setLoading(false);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/products/${category}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="categories-page">
      {/* Promotional Banner */}
      <div className="promo-banner">
        <h2>Season Sale - Up to 50% Off</h2>
        <p>Discover amazing deals across all categories!</p>
      </div>

      {/* Categories Header */}
      <div className="categories-header">
        <h2>Shop by Category</h2>
        <p>Explore our curated selection of Womens wear, Mens wear, and Electronics.</p>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {categories.map((category) => {
          const products = getProductsFromCategory(category.title);
          return (
            <div key={category.id} className="category-card">
              <div className="category-image-wrapper">
                <img
                  src={category.image}
                  alt={category.title}
                  className="category-image"
                  onClick={() => handleCategoryClick(category.title)}
                />
                <div className="category-overlay">
                  <div className="category-overlay-content">
                    <div className="category-text">
                      <h3>{category.title}</h3>
                      <p className="category-count">{products.length} items</p>
                    </div>
                    <button
                      className="view-products-button"
                      onClick={() => handleCategoryClick(category.title)}
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesPage;