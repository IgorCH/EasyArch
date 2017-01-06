var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/database');
var User = require('./app/models/user');

mongoose.connect(config.database);

var user = new User({
  name: 'manager',
  mail: 'manager@mail.ru',
  password: 'manager',
  clientRights: true,
  workerRights: true,
  managerRights: true,
  adminRights: false
});

user.save(function (err, user) {

  if (!err) {
    console.log('Manager added');
  } else {
    console.log('error', err);
  }

  mongoose.disconnect();

});
