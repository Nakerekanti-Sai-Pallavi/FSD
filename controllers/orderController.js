const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  const { items, address } = req.body;
  const userId = req.user.userId;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  if (!address) {
    return res.status(400).json({ message: 'Address is required' });
  }

  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  try {
    const order = new Order({
      user: userId,
      items,
      address,
      total
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to place order' });
  }
};
