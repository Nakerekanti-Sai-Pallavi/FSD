const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role  // ✅ accepts either "user" or "admin"
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create token
   const token = jwt.sign(
  { userId: user._id, role: user.role },  // include role here
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);


    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update current user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const update = { name, email };
    if (password) {
      update.password = await bcrypt.hash(password, 10);
    }
    const user = await User.findByIdAndUpdate(req.user.userId, update, {
      new: true,
      select: '-password'
    });
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

