var mongoose = require('mongoose');

var libs = '../../libs/';

var log = require(libs + 'log')(module);
var config = require('../config');

mongoose.connect('mongodb://localhost/archi');

var db = mongoose.connection;

db.on('error', function (err) {
	log.error('Connection error:', err.message);
});

db.once('open', function callback () {
	log.info("Connected to DB!");
});

module.exports = mongoose;