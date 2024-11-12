const Room = require('../models/Room'); // Assuming you have a Room model

// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const { userIds } = req.body; // Assuming the body contains an array of user IDs

    // Create a new room with users
    const newRoom = new Room({
      participants: userIds,
      createdAt: new Date(),
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating room' });
  }
};
