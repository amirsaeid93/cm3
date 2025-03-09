const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jobRoutes = require('../routes/jobRouter');

const app = express();

const allowedOrigins = [
  'http://localhost:3000', // Local dev frontend
  'https://cm3-xjm0.onrender.com' // Replace with your actual Render frontend URL
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // If using cookies or authentication headers
}));

app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(4000, () => console.log('Server running on port 4000')))
  .catch(err => console.error(err));