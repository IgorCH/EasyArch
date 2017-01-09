var nconf = require('nconf');
nconf.argv().env().file({ file: './config/config.json' });

var express = require("express");
var app = express();

var mongoose = require('mongoose');
mongoose.connect(nconf.get("db:database"));

var session = require('express-session');

//var redis = require("redis");
//var redisStore = require('connect-redis')(session);

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var client  = redis.createClient();

var cors = require('cors');
var auth = require('./routes/auth');

//var ea_passport = require('./passport/passport');
//app.use(ea_passport.passport.initialize());

app.use(cors());

app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: nconf.get("redis:secretKey")
  //, store: new redisStore({
  //   host: nconf.get("redis:host"),
  //   port: nconf.get("redis:port"),
  //   client: client,
  //   ttl: 260
  // })
}));



app.use(cookieParser(nconf.get("express:cookieParserSecretKey")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/frontend/app'));
app.use('/prod', express.static(__dirname + '/frontend/dist'));

app.use('/api/user', auth);

app.listen(nconf.get("express:port"), function() {
  console.log("Express running on port " + nconf.get("express:port"));
});