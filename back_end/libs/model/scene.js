var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Scene = new Schema({
    title: { type: String, required: true },
    authorId: { type: String, required: true },
    style: { type: String },
    gamma: { type: String },
    tone: { type: String },
    mainColor: { type: String },
    accentColor: { type: String },
    material: { type: String },
    room: { type: String },
    url: { type: String, required: true }
});

Scene.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

module.exports = mongoose.model('Scene', Scene);