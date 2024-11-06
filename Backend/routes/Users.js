const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    const userExists = await Users.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({ name, phone, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Error registering user', error });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ success: true, message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error });
  }
});

// Fetch user profile
router.get('/profile', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user data', error });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  const { email, name, phone, address1, address2 } = req.body;

  try {
    const updatedUser = await Users.findOneAndUpdate(
      { email },
      { name, phone, address1, address2 },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
});

module.exports = router;
