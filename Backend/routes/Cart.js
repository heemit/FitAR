const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Order = require('../models/Order');

// Add or update item in cart
router.post('/add', async (req, res) => {
  const { userId, productId, quantity, price, name, imageUrl } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const productIndex = cart.products.findIndex(product => product.productId.toString() === productId);

      if (productIndex > -1) {
        // Product already exists in the cart, update quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Add new product to the cart
        cart.products.push({ productId, quantity, price, name, imageUrl });
      }
    } else {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, products: [{ productId, quantity, price, name, imageUrl }] });
    }

    await cart.save();
    res.status(200).json({ success: true, message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ success: false, message: 'Error updating cart', error });
  }
});

// Get user's cart
router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    const cart = await Cart.findOne({ userId });
    res.json(cart || { products: [] }); // Return empty cart if not found
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ success: false, message: 'Error fetching cart', error });
  }
});

// Clear cart and create order
router.post('/checkout', async (req, res) => {
    const { userId } = req.body;
  
    try {
      const cart = await Cart.findOne({ userId });
  
      if (!cart || cart.products.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart is empty' });
      }
  
      const products = cart.products.map(product => ({
        productId: product.productId, // Make sure this is correctly referenced
        quantity: product.quantity,
        name: product.name, // Include name if needed
        price: product.price, // Include price if needed
        imageUrl: product.imageUrl // Include imageUrl if needed
      }));
  
      const totalAmount = products.reduce((total, product) => total + product.price * product.quantity, 0);
      const order = new Order({ userId, products, totalAmount });
      
      await order.save();
      await Cart.findOneAndDelete({ userId }); // Clear the cart
  
      res.status(201).json({ success: true, message: 'Order placed successfully', order });
    } catch (error) {
      console.error('Error during checkout:', error);
      res.status(500).json({ success: false, message: 'Error during checkout', error });
    }
  });

module.exports = router;
