const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error getting profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.json({ message: "Profile updated", user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};
