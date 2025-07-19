import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, items, deliveryDate } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-2xl w-full text-center animate-fade-in">
        <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank you for your purchase!</h1>
        <p className="text-gray-600 mb-4">
          Your order has been placed successfully. We’ll send you a confirmation shortly.
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-4">Order ID: <span className="font-semibold">{orderId}</span></p>
        )}
        {deliveryDate && (
          <p className="text-sm text-gray-500 mb-6">Estimated Delivery: <span className="font-semibold">{deliveryDate}</span></p>
        )}

        {items?.length > 0 && (
          <div className="text-left border-t pt-4 mt-4">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {items.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-md transition duration-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
