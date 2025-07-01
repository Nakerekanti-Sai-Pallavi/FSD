const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Add a new book
// @route   POST /api/books
exports.addBook = async (req, res) => {
  console.log("📦 POST /api/books called", req.body); 
  const { title, category, price, image } = req.body;

  try {
    const newBook = new Book({ title, category, price, image });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add book' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book" });
  }
};

