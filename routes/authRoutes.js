const express = require('express');
const router = express.Router();
const { signup, login, getProfile, updateProfile} = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

// @route   POST /api/auth/signup
router.post('/signup', signup);

// @route   POST /api/auth/login
router.post('/login', login);

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

module.exports = router;
