const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust the path to your Product model

// GET /products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// GET /products/:id
router.get('/:id', async (req, res) => {
  try {
    // Ensure that the provided ID is in a valid format
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId); // Fetch the product by ID

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product); // Send the product as a response
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

module.exports = router;
