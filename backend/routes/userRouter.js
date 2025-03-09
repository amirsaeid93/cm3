const express = require('express');
const { signupUser, loginUser, getMe } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/me', requireAuth, getMe);

module.exports = router;