import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { CartContext } from "../context/CartContext";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    navigate("/"); // redirect to home or success page
  };

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h2>Review Your Order</h2>
        {cartItems.map((item) => (
          <div className="checkout-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="item-details">
              <h4>{item.title}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ₹{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-right">
        <h3>Order Summary</h3>
        <p>Items: {cartItems.length}</p>
        <p>Total: ₹{totalAmount.toFixed(2)}</p>
        <button onClick={handlePlaceOrder}>Place Your Order</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
