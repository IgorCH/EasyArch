var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    img: {
        type: String
    },
    lng: {
        type: String
    },
    admin: {
        type: Boolean
    },
    manager: {
        type: Boolean
    },
    designer: {
        type: Boolean
    },
    client: {
        type: Boolean
    }
});

module.exports = mongoose.model('User', UserSchema);