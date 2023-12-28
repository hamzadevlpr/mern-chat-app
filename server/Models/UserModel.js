const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: false
    },
    provider: {
        type: String,
        required: false
    },
    about: {
        type: String,
        required: false
    },
    verifyToken: {
        type: String,
    },
    token: {
        type: String
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
