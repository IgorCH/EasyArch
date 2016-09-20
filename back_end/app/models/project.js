var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
    title: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    square: {
        type: Number
    },
    price: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: ['Created', 'At Work', 'Finished'],
        default: 'Created'
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]




  /*var mongoose = require('mongoose')
  , Schema = mongoose.Schema

  var personSchema = Schema({
      _id     : Number,
      name    : String,
      age     : Number,
      stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
  });

var storySchema = Schema({
    _creator : { type: Number, ref: 'Person' },
    title    : String,
    fans     : [{ type: Number, ref: 'Person' }]
});

*/



    //files: { type: Array },
    //models: { type: Array },
    //scenes: { type: Array },
    //result_files: { type: Array }
});

//Project.path('title').validate(function (v) {
//    return v.length > 5 && v.length < 70;
//});

module.exports = mongoose.model('Project', Project);