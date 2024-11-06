const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Import routes
const userRoutes = require('./routes/Users');
const orderRoutes = require('./routes/Order');
const productRoutes = require('./routes/Product');
const cartRoutes = require('./routes/Cart');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/FitAR')
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.error('MongoDB connection error:', error));

// Route definitions
app.use('/auth', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes); // Cart routes

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
