import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});  // Keep a quantity state for each product
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchCartItems();
    }
  }, [navigate]);

  const fetchCartItems = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error('User email not found in local storage');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/cart?userId=${userEmail}`);
      const cart = response.data; 
      setCartItems(cart.products || []);
      setQuantities(cart.products.reduce((acc, product) => {
        acc[product.productId] = product.quantity; 
        return acc;
      }, {}));
    } catch (error) {
      console.error('Error fetching cart items', error);
    }
  };

  const handleQuantityChange = (id, value) => {
    if (value > 0) {
      const updatedQuantities = {
        ...quantities,
        [id]: value,
      };
      setQuantities(updatedQuantities);
      localStorage.setItem('quantities', JSON.stringify(updatedQuantities)); // Update localStorage
    }
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.productId !== id);  // Use productId for filtering
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[id]; // Remove the specific quantity for the removed item
    setCartItems(updatedItems);
    setQuantities(updatedQuantities);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update localStorage
    localStorage.setItem('quantities', JSON.stringify(updatedQuantities)); // Update localStorage
  };

  const moveToWishlist = (item) => {
    console.log(`Move ${item.name} to wishlist`);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const quantity = quantities[item.productId] || 1; // Default to 1 if quantity is not set
      return total + (item.price * quantity);
    }, 0);
  };

  const handleBuyNow = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error('User email is not found in local storage');
      return;
    }

    const orderData = {
      userId: userEmail
    };

    try {
      const response = await axios.post('http://localhost:5000/cart/checkout', orderData);
      localStorage.setItem('orderId', response.data.order._id);
      localStorage.removeItem('cartItems');
      localStorage.removeItem('quantities');
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error placing order', error);
    }
  };

  const totalAmount = calculateTotalAmount();
  const discount = totalAmount * 0.1;
  const discountedAmount = totalAmount - discount;
  const cgst = discountedAmount * 0.09;
  const sgst = discountedAmount * 0.09;
  const totalTax = cgst + sgst;
  const finalAmount = discountedAmount + totalTax;

  return (
    <div className="cart-page">
      <div className="cart-content">
        <div className="cart-items-box">
          <h2 className="cart-title">Your Cart</h2>
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.productId} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px' }} />
                  <div className="item-details">
                    <h3 style={{ fontWeight: 'bold' }}>{item.name}</h3>
                    <p>Price: ₹{item.price}</p>
                    <label>
                      Quantity:
                      <input 
                        type="number" 
                        value={quantities[item.productId] || 1} // Default to 1 if not set
                        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                        min="1"
                      />
                    </label>
                    <button className="wishlist-button" onClick={() => moveToWishlist(item)}>Move to Wishlist</button>
                    <button className="remove-button" onClick={() => removeItem(item.productId)}>Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="order-details">
          <h3>Order Details</h3>
          <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
          <p>Discount (10%): -₹{discount.toFixed(2)}</p>
          <p>Discounted Amount: ₹{discountedAmount.toFixed(2)}</p>
          <p>CGST (9%): ₹{cgst.toFixed(2)}</p>
          <p>SGST (9%): ₹{sgst.toFixed(2)}</p>
          <p>Total Tax: ₹{totalTax.toFixed(2)}</p>
          <h4>Final Amount: ₹{finalAmount.toFixed(2)}</h4>
          <button className="button" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
