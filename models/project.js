var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
    title: { type: String, required: true },
    client : { type: Schema.Types.ObjectId, ref: 'User' },
    manager : { type: Schema.Types.ObjectId, ref: 'User' },
    designers : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    square: { type: Number },
    price: { type: String },
    closed: { type: Boolean, default: false },
    tasks: [],
    files: { type: Array },
    models: { type: Array },
    scenes: { type: Array },
    result_files: { type: Array }
});

Project.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

module.exports = mongoose.model('Project', Project);