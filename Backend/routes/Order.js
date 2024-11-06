const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const nodemailer = require('nodemailer');

// Place an order
router.post('/', async (req, res) => {
  const { userId, products, totalAmount } = req.body;
  try {
    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: 'No products provided' });
    }

    // Fetch product details
    const productDetails = await Product.find({ _id: { $in: products.map(p => p.productId) } });
    
    // Map product details to include in the order
    const enrichedProducts = productDetails.map(product => ({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: products.find(p => p.productId === product._id).quantity
    }));

    const newOrder = new Order({ userId, products: enrichedProducts, totalAmount });
    await newOrder.save();

    // Send confirmation email
    await sendOrderConfirmation(userId, newOrder);
    
    res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Error placing order', error: error.message });
  }
});


// Get user's orders
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Error fetching orders', error });
  }
});

// Update order status
router.post('/update-status', async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Error updating order status', error });
  }
});

// Send order confirmation email
const sendOrderConfirmation = async (email, order) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mern.project16010122@gmail.com', // Replace with your email
      pass: 'ptgraeytnvpuijuh', // Replace with your app password
    },
  });

  const productDetails = order.products.map(product => 
    `Product ID: ${product.productId} - Quantity: ${product.quantity}`
  ).join('\n');

  const mailOptions = {
    from: 'mern.project16010122@gmail.com', // Replace with your email
    to: email,
    subject: 'Order Confirmation',
    text: `Your order has been placed successfully!\n\nOrder ID: ${order._id}\nTotal Amount: ₹${order.totalAmount}\n\nProducts:\n${productDetails}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to:', email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Modify the place order route to pass the order details
router.post('/', async (req, res) => {
  const { userId, products, totalAmount } = req.body;
  try {
    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: 'No products provided' });
    }

    const newOrder = new Order({ userId, products, totalAmount });
    await newOrder.save();

    await sendOrderConfirmation(userId, newOrder); // Send email with order details

    res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Error placing order', error: error.message });
  }
});

// Send delivery confirmation email
router.post('/send-delivery-confirmation', async (req, res) => {
  const { email, orderId } = req.body;

  try {
    const order = await Order.findById(orderId);
    await sendOrderConfirmation(email, order); // Reuse the sendOrderConfirmation method
    res.status(200).json({ success: true, message: 'Delivery confirmation email sent' });
  } catch (error) {
    console.error('Error sending delivery confirmation email:', error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
});

module.exports = router;
