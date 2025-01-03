const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully!', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get user details
exports.getUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.json({ message: 'User updated successfully!', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.json({ message: 'User deleted successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
