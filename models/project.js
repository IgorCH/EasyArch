var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Task = require('./task');

var Message = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    attachments: { type: String },
    clientVisible: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

var Task = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    designer : { type: Schema.Types.ObjectId, ref: 'User' },
    params: { type: String },
    //price: { type: String },
    messages: [ Message ],
    status: { type: String },
    attachments: { type: Array },
    models: { type: Array },
    //scenes: { type: Array },
    results: { type: Array }
});

var Project = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    client : { type: Schema.Types.ObjectId, ref: 'User' },
    manager : { type: Schema.Types.ObjectId, ref: 'User' },
    tasks: [Task]
});

//Project.path('title').validate(function (v) {
//    return v.length > 5 && v.length < 70;
//});

module.exports = {
    Project: mongoose.model('Project', Project),
    Task: mongoose.model('Task', Task),
    Message: mongoose.model('Message', Message)
};