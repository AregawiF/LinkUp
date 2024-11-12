const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

exports.getUserData = async (req, res) => {
  try {
    const userId = req.user.userId; // userId is set by the auth middleware after decoding the token
    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { name } = req.query;
    const users = await User.find({ name: { $regex: name, $options: 'i' } }); // Case-insensitive search
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};