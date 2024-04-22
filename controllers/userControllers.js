const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./../models/userModel');
const Cart = require('../models/cartModel');

dotenv.config({ path: './config.env'});

exports.register = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email is already taken'
            });
        }

        const newUser = new User({ name, email, password, isAdmin });
        await newUser.save();

        // Create a new cart for the user
        const newCart = new Cart({ user: newUser._id });
        await newCart.save();

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message // Returning error message for better debugging
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid credential'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid credential'
            });
        }

        const payload = { user: { id: user.id, isAdmin: user.isAdmin } };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: process.env.EXPIRESIN });

        res.status(200).json({
            status: 'success',
            user: user,
            token: token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');

        res.status(200).json({
            status: 'success',
            message: 'Logout successful'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        console.log(users);

        res.status(201).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    }catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!'
        });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password').select('-access');

        res.status(200).json({
            status: 'success',
            user: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};