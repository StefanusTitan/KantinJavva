const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./../models/userModel');

dotenv.config({ path: './config.env'});

exports.register = async (req, res) => {
    const { name, email, password, access } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email is already taken'
            });
        }

        const newUser = new User({ name, email, password, access });
        await newUser.save();

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

        const payload = { user: { id: user.id } };
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