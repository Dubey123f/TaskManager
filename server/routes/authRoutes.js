const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getAllUsers } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.get('/users', protect, authorize('admin'), getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;