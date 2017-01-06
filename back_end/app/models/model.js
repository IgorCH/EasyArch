var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Model = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String
    }
    //Чекбоксы всякие
});

module.exports = mongoose.model('Model', Model);