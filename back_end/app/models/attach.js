var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Attach = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'in',
        enum: ['in', 'out']
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Attach', Attach);