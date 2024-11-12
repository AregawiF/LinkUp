const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    // console.log('req body', req.body);
    const {name, username, email, password } = req.body;
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        print("Errors:", errors);
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("Email:", email);
            console.log("User exists:", userExists);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create and save the new user
        const newUser = new User({ name, username, email, password });
        console.log("New user before save:", newUser);
        try {
            await newUser.save();
        } catch (err) {
            console.log("Error saving user:", err);
        }
        console.log("User saved successfully");

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET_KEY, 
            { expiresIn: '3d' }
        );

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
