// server/index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// ➕ auth routes import
const authRoutes = require('./routes/authRoutes');

const app = express();

// middlewares
app.use(
  cors({
    origin: '*',         // later specific frontend URL podalam
    credentials: false,  // cookies use panna porom na true panna lam
  })
);
app.use(express.json());
app.use(cookieParser());

// test route
app.get('/', (req, res) => {
  res.send('RoomieNow backend running 🚀');
});

// ✅ auth base route
app.use('/api/auth', authRoutes);

// DB connect & server start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
