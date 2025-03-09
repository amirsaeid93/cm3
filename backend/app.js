require('dotenv').config();
const express = require("express");
const cors = require("cors");
const jobRouter = require('./routes/jobRouter');
const userRouter = require('./routes/userRouter');
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Allow only requests from this origin
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/jobs", jobRouter);
app.use("/api/users", userRouter);

// Custom middleware
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;