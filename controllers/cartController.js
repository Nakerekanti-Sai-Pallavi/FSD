const Cart = require('../models/Cart');

// @desc Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load cart' });
  }
};

// @desc Add/update cart
exports.saveCart = async (req, res) => {
  const { items } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.userId });

    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = new Cart({ user: req.user.userId, items });
      await cart.save();
    }

    res.status(200).json({ message: 'Cart saved successfully', cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save cart' });
  }
};
