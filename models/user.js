var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    salt : {
        type: String,
        required: true
    },
    hash : {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    lng: {
        type: String,
        default: "RU"
    },
    admin: {
        type: Boolean,
        default: false
    },
    manager: {
        type: Boolean,
        default: false
    },
    designer: {
        type: Boolean,
        default: false
    },
    client: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', UserSchema);