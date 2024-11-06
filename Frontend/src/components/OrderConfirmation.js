import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sendOrderConfirmationEmail = async () => {
      const userEmail = localStorage.getItem('userEmail');
      const orderId = localStorage.getItem('orderId'); // Retrieve orderId from local storage
      
      if (!orderId) {
        console.error('Order ID not found');
        return;
      }

      try {
        await axios.post('http://localhost:5000/send-order-confirmation', { email: userEmail, orderId });
        console.log('Order confirmation email sent');
      } catch (error) {
        console.error('Error sending order confirmation email', error);
      }
    };

    sendOrderConfirmationEmail();
  }, []);

  return (
    <div className="order-confirmation-page">
      <h2>Order Placed Successfully!</h2>
      <p>Your order has been placed. A confirmation email with the order details has been sent.</p>
      <button onClick={() => navigate('/orders')}>View Orders</button>
    </div>
  );
};

export default OrderConfirmation;
