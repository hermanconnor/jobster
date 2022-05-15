import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';

// CONNECT TO DATABASE
connectDB();

// INITIALIZE EXPRESS APP
const app = express();

// START SERVER
const PORT = process.env.PORT || 5000;

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB...');

  app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
});
