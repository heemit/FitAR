import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchOrders();
    }
  }, [navigate]);

  const fetchOrders = async () => {
    const userEmail = localStorage.getItem('userEmail');
    console.log('User email:', userEmail);
    try {
      const response = await axios.get(`http://localhost:5000/orders?userId=${userEmail}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };

  const updateTrackingStatus = useCallback(async (orderId, currentStatus) => {
    const statuses = ['Order Placed', 'Order Packed', 'Order Shipped', 'Out for Delivery', 'Order Delivered'];
    const nextStatusIndex = statuses.indexOf(currentStatus) + 1;
  
    if (nextStatusIndex < statuses.length) {
      const nextStatus = statuses[nextStatusIndex];
      await axios.post('http://localhost:5000/update-status', { orderId, status: nextStatus });
      
      // Check if the next status is 'Order Delivered'
      if (nextStatus === 'Order Delivered') {
        const userEmail = localStorage.getItem('userEmail');
        await axios.post('http://localhost:5000/send-delivery-confirmation', { email: userEmail, orderId });
      }
  
      fetchOrders();
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      orders.forEach(order => {
        if (order.status !== 'Order Delivered') {
          updateTrackingStatus(order._id, order.status);
        }
      });
    }, 20000); // Change to 20 seconds

    return () => clearInterval(intervalId);
  }, [orders, updateTrackingStatus]);

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-item">
            <h3>Order #{order._id}</h3>
            <p>Status: {order.status}</p>
            <p>Total Amount: ₹{order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</p>
            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <ul>
              {order.products.map((product, idx) => (
                <li key={idx}>
                  <img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px' }} />
                  <p>Name: {product.name}</p>
                  <p>Price: ₹{product.price ? product.price.toFixed(2) : 'N/A'}</p>
                  <p>Product ID: {product.productId} - Quantity: {product.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
