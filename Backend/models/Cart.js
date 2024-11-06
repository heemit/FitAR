const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
      name: { type: String, required: true },
      imageUrl: { type: String, required: true },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
