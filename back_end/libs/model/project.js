var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
    title: { type: String, required: true },
    authorId: { type: String, required: true },
    square: { type: Number },
    price: { type: String },
    status: { type: String, required: true, default: 'Created' },
    files: { type: Array },
    models: { type: Array },
    scenes: { type: Array },
    result_files: { type: Array }
});

Project.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

module.exports = mongoose.model('Project', Project);