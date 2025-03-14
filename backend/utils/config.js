require('dotenv').config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;

module.exports = {
  PORT,
  MONGO_URI,
  SECRET
};