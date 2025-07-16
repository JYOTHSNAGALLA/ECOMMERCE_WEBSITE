import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // <-- CSS file

function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <div className="checkout-container">
      <div className="confirmation-card">
        <h1>✅ Thank you for your purchase!</h1>
        <p>Your order has been placed successfully. You will receive a confirmation email shortly.</p>
        <button className="go-home-btn" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;

