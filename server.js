var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors');
var ea_passport = require('./passport/passport');

var db = require('./db/mongoose');

app.use(ea_passport.passport.initialize());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/frontend/app'));
app.use('/prod', express.static(__dirname + '/frontend/dist'));

app.use('/api/user', ea_passport.router);

app.listen(3000, function() {
  console.log("Express running on port 3000");
});