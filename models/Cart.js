const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      title: String,
      price: Number,
      image: String,
      category: String,
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
