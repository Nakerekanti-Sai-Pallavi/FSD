const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  address: String,
  items: Array,
  total: Number,
  delivered: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
