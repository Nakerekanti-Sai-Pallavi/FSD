const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, getProfile);
router.put('/', verifyToken, updateProfile);

module.exports = router;
