var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
    text: { type: String, required: true },
    authorId: { type: String, required: true },
    isForClient: { type: Boolean },
    datetime: { type: String, required: true }
});

module.exports = mongoose.model('Message', Message);