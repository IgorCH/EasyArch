var nconf = require('nconf');
nconf.argv().env().file({ file: './config/config.json' });

var express = require("express");
var redis = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var client  = redis.createClient();
var app = express();
var cors = require('cors');
var ea_passport = require('./passport/passport');

var mongoose = require('mongoose');
mongoose.connect(nconf.get("db:database"));

app.use(ea_passport.passport.initialize());
app.use(cors());

app.use(session({
  secret: nconf.get("redis:secret"),
  store: new redisStore({
    host: nconf.get("redis:host"),
    port: nconf.get("redis:port"),
    client: client,
    ttl: 260
  }),
  saveUninitialized: false,
  resave: false
}));

app.use(cookieParser(nconf.get("express:cookieParserSecretKey")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/frontend/app'));
app.use('/prod', express.static(__dirname + '/frontend/dist'));

app.use('/api/user', ea_passport.router);

app.listen(3000, function() {
  console.log("Express running on port 3000");
});