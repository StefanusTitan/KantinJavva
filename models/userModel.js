const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: { 
        type: Boolean, default: false 
    },
    image: { 
        type: String 
    }
});

userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }

        user.password = hash;
        next();
    });
});

const User = mongoose.model('User', userSchema, 'user');

module.exports = User;