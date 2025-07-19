import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../App.css"; // for animation & styling

const ThankYouPage = () => {
  return (
    <div className="thankyou-container">
      <div className="thankyou-box">
        <FaCheckCircle className="thankyou-icon" />
        <h1 className="thankyou-message">Thank You for Your Purchase!</h1>
        <p className="thankyou-text">
          Your order has been placed successfully. We’ll send you a confirmation email shortly.
        </p>
        <Link to="/" className="thankyou-home-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
