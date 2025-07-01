const express = require('express');
const router = express.Router();
const { getBooks, addBook } = require('../controllers/bookController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// Public route
router.get('/', getBooks);

// Admin-only routes
router.post('/', verifyToken, verifyAdmin, addBook);
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch {
    res.status(500).json({ message: 'Error deleting book' });
  }
});

module.exports = router;
