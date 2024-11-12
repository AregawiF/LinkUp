const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { searchUsers } = require('../controllers/usersController');
const { getUserData } = require('../controllers/userController');

// Protect this route with authMiddleware
router.get('/', authMiddleware, getUserData);

router.get('/search', searchUsers);

module.exports = router;
