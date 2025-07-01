const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Fiction', 'Motivation', 'Self-Help', 'Science', 'Children', 'History'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
