const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true }, // For categorization
  subcategory: { type: String, required: true } // For subcategorization
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
