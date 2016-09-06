var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Task = new Schema({
    title: { type: String, required: true },
    authorId: { type: String, required: true },
    projectId: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true }
});

Task.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

module.exports = mongoose.model('Task', Task);