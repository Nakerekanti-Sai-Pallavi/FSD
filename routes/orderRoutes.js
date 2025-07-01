const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const Order = require("../models/Order");

router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});
router.put("/:id/deliver", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.delivered = true;
    await order.save();

    res.json({ message: "Order marked as delivered" });
  } catch {
    res.status(500).json({ message: "Failed to update order" });
  }
});

module.exports = router;
