var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Model = new Schema({
    title: { type: String, required: true },
    authorId: { type: String, required: true },
    code: { type: String },  //KA 82
    category: { type: String }, // Кухонные аксессуары
    producer: { type: String }, //Kitchen Accesories
    style: { type: String },  //classic modern
    material: { type: String },  //leather metal
    url: { type: String, required: true }
});

Model.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

module.exports = mongoose.model('Model', Model);