// roomsRoutes.js
const express = require('express');
const { createRoom } = require('../controllers/roomsController');
const router = express.Router();

router.post('/', createRoom);

module.exports = router;
