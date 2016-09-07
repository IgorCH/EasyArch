var libs = '../libs/';
var config = require('./config');
var log = require('./log')(module);

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var multipart = require('connect-multiparty');

var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var profile = require('./routes/profile');
var profile_details = require('./routes/profile_details');

var projects = require('./routes/projects');
var tasks = require('./routes/tasks');
var models = require('./routes/models');
var scenes = require('./routes/scenes');
var portfolio = require('./routes/portfolio');

var files = require('./routes/files');

var app = express();
var myPassport = require('./my_passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());

app.use(session({
    genid: function(req) {
        return require('crypto').randomBytes(48).toString('hex');
    },
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true
}));

app.use(multipart({
    uploadDir: '../public/project_data/files'
}));

app.use(myPassport.initialize());
app.use(myPassport.session());
app.use(express.static(path.normalize(__dirname + '/../public/')));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/logout', logout);
app.use('/api/profile', profile);
app.use('/api/profile_details', profile_details);

app.use('/api/projects', projects);
app.use('/api/tasks', tasks);
app.use('/api/models', models);
app.use('/api/scenes', scenes);
app.use('/api/portfolio', portfolio);

app.use('/api/files', files);

app.use(function(req, res, next) {
    res.status(404);
    log.debug('%s %d %s', req.method, res.statusCode, req.url);
    res.json({ 
    	error: 'Not found'
    });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('%s %d %s', req.method, res.statusCode, err.message);
    res.json({ 
    	error: err.message 
    });
    return;
});

module.exports = app;