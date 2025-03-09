const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jobRoutes = require('./routes/jobRouter');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Allow only requests from this origin
}));
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(4000, () => console.log('Server running on port 4000')))
  .catch(err => console.error(err));