var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Task = new Schema({
    title: { type: String, required: true },
    description: { type: String }
});

Task.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

module.exports = mongoose.model('Task', Task);