const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const commentsRoutes = require('./routes/comments');
const exploreRoutes = require('./routes/explore');
const productsRoutes = require('./routes/products');

const app = express();

// Security
app.use(helmet());

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
//  MODERN CLEAN CODE
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/explore', exploreRoutes);
app.use('/api/products', productsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ success: false, message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
