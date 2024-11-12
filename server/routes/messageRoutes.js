const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware"); // Auth middleware

// Send a direct message
router.post("/send", protect, sendMessage);

// Get messages for a room (DM)
router.get("/:roomId", protect, getMessages);

module.exports = router;
