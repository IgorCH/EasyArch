var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/database');
var User = require('./app/models/user');

mongoose.connect(config.database);

var user = new User({
  name: 'admin',
  mail: 'admin@mail.ru',
  password: 'admin',
  clientRights: true,
  workerRights: true,
  managerRights: true,
  adminRights: true
});

user.save(function (err, user) {

  if (!err) {
    console.log('Admin added');
  } else {
    console.log('error', err);
  }

  mongoose.disconnect();

});
