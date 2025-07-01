const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Serve frontend files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
