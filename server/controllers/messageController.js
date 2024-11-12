const Message = require("../models/Message");
const Room = require("../models/Room");

exports.sendMessage = async (req, res) => {
  try {
    const { content, roomId } = req.body;
    const sender = req.user.userId; // Get sender from decoded token (auth middleware)

    // Find the room to ensure it's a valid DM room
    const room = await Room.findById(roomId).populate('participants');
    if (!room || room.type !== 'dm') {
      return res.status(400).json({ message: 'Invalid room' });
    }

    // Create new message
    const message = new Message({
      sender,
      roomId,
      content,
    });

    await message.save();

    // Emit the message to the room via Socket.IO (for real-time functionality)
    // Assuming you have a socket connection in place
    req.io.to(roomId).emit('receive_message', message);

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Fetch messages for the DM room
    const room = await Room.findById(roomId);
    if (!room || room.type !== 'dm') {
      return res.status(400).json({ message: 'Invalid room' });
    }

    const messages = await Message.find({ roomId }).sort('timestamp');
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
