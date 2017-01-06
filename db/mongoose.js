var mongoose = require('mongoose');
var config = require('../config/database');
mongoose.connect(config.database);

module.exports = mongoose;