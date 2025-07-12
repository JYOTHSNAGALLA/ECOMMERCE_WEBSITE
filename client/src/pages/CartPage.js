import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, NavLink } from 'react-router-dom';
import "../App.css";

function CartPage () {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-items">
          <h2>Your Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div className="cart-item" key={product.id}>
                <img src={product.image} alt={product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <p>Price: ₹{product.price}</p>
                  <div className="cart-item-actions">
                    <select
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(product.id, parseInt(e.target.value))
                      }
                    >
                      {[1, 2, 3, 4, 5].map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-cart">Your cart is empty. Go to <NavLink to="/products">products</NavLink> and start shopping!</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Total Items: {cartItems.length}</p>
            <p>Total Price: ₹{total}</p>
            <button
               className="checkout-btn"
                onClick={() => navigate("/checkout")}
             >
                 Proceed to Checkout
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
