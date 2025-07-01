const express = require('express');
const router = express.Router();
const { getCart, saveCart } = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, getCart);
router.post('/', verifyToken, saveCart);

module.exports = router;
