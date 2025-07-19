import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const CheckoutPage = () => {
  const { cartItems, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    navigate('/thank-you', {
  state: {
    orderId: "ORD12345678",
    deliveryDate: "20 July 2025",
    items: cartItems,
  },
});
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        {/* Left section */}
        <div className="checkout-left">
          <div className="checkout-section">
            <h3>Delivery Address</h3>
            <p>Jyothsna Galla<br />123 Main Street, Hyderabad, TS<br />PIN - 500001</p>
          </div>

          <div className="checkout-section">
            <h3>Delivery Method</h3>
            <select>
              <option>Standard (4-5 days)</option>
              <option>Express (1-2 days)</option>
            </select>
          </div>

          <div className="checkout-section">
            <h3>Payment Method</h3>
            <select>
              <option>Cash on Delivery</option>
              <option>Credit/Debit Card (Coming Soon)</option>
              <option>UPI / Netbanking (Coming Soon)</option>
            </select>
          </div>
        </div>

        {/* Right section */}
        <div className="checkout-right">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="checkout-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <p>{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}

          <div className="checkout-total">
            <strong>Total:</strong> ₹{totalPrice().toFixed(2)}
          </div>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
