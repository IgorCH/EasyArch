var mongoose = require('mongoose');

var User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'c'
    },
    lng: {
        type: String,
        required: true,
        default: 'EN'
    },
    registrationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('User', User);