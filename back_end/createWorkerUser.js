var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/database');
var User = require('./app/models/user');

mongoose.connect(config.database);

var user = new User({
  name: 'worker',
  mail: 'worker@mail.ru',
  password: 'worker',
  clientRights: true,
  workerRights: true,
  managerRights: false,
  adminRights: false
});

user.save(function (err, user) {

  if (!err) {
    console.log('Worker added');
  } else {
    console.log('error', err);
  }

  mongoose.disconnect();

});
