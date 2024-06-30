const User = require('../models/User');
const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        const token = authService.generateToken(user._id);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !await user.comparePassword(password)) {
            throw new Error('Invalid username or password');
        }
        const token = authService.generateToken(user._id);
        res.json({ token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};
