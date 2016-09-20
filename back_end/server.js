var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	  = require('passport');
var config      = require('./config/database');

var User        = require('./app/models/user');
var Project     = require('./app/models/project');
var Task        = require('./app/models/task');
var Model       = require('./app/models/model');
var Scene       = require('./app/models/scene');
var Attach      = require('./app/models/attach');
var Message     = require('./app/models/message');

var port        = process.env.PORT || 8080;
var jwt         = require('jwt-simple');
var cors        = require('cors');
                  require('./config/passport')(passport);
var multer      = require('multer');

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use('/static', express.static(__dirname + '/uploads'));

app.get('/', function(req, res) {
    res.send('API at /api');
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};
getCurrentUser = function(req, res, successCallback) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        }, function(err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                successCallback && successCallback(req, res, user);
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
};

var apiRoutes = express.Router();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*W*/
apiRoutes.post('/signup', function(req, res) {
    if (!req.body.name || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {
        var newUser = new User({
            name: req.body.name,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});
/*W*/
apiRoutes.post('/login', function(req, res) {
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});
/*W*/
apiRoutes.get('/me', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {
        res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*N Получение всех пользователей*/
apiRoutes.get('/user/', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {
        User.find(function (err, projects) {
            if (!err) {
                return res.json(projects);
            } else {
                res.statusCode = 500;
                return res.json({
                    error: 'Server error'
                });
            }
        });
    });
});
/*N Получение профиля*/
apiRoutes.get('/user/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
    getCurrentUser(function(req, res, user){
        Project.find(function (err, projects) {
            if (!err) {
                return res.json(projects);
            } else {
                res.statusCode = 500;
                return res.json({error: 'Server error'});
            }
        });
    })
});
/*N Добавление профиля*/
apiRoutes.post('/user/', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*N Изменение профиля*/
apiRoutes.put('/user/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
    getCurrentUser(function(req, res, user){

    })
});
/*N Удаление профиля*/
apiRoutes.put('/user/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
    getCurrentUser(function(req, res, user){

    })
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Работа только со своими проектами
/*W Получение списка проектов*/
apiRoutes.get('/project/', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {
        Project.find(function (err, projects) {
            if (!err) {
                return res.json(projects);
            } else {
                res.statusCode = 500;
                return res.json({error: 'Server error'});
            }
        });
    });
});
/*N Пролучение одного проекта по ID*/
apiRoutes.get('/project/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
    //console.log(req.params.id);
    getCurrentUser(req, res, function(req, res, user) {
        Project
          .findById(req.params.id)
          .populate('tasks')
          .exec(function (err, project) {
            if (!project) {
                res.statusCode = 404;
                return res.json({
                    error: 'Not found'
                });
            }

            if (!err) {
                return res.json(project);
            }
        });
    });
});
/*W Создание проекта*/
apiRoutes.post('/project/', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {
        var project = new Project({
            title: req.body.title,
            ownerId: user._id
        });



        project.save(function (err, project) {
            if (!err) {

                var task = new Task({
                    title: "first task",
                    description: "description of task",
                    creatorId: user._id,
                });
                task.save(function(err, task) {
                    project.tasks.push(task._id);
                    project.save(function(err, project) {
                        //return res.json(project);


                        Project
                          .find()
                          .populate('tasks')
                          .exec(function (err, projects) {
                              return res.json(projects);
                          });



                    });
                });


            } else {
                if (err.name === 'ValidationError') {
                    res.status(400).json({error: 'Validation error'});
                } else {
                    res.status(500).json({error: 'Server error'});
                }
            }
        });
    });
});
/*N Изменение проекта*/
apiRoutes.put('/project/:id', passport.authenticate('jwt', {session: false}), function (req, res){
    getCurrentUser(req, res, function(req, res, user) {
        var projectId = req.params.id;
        Project.findById(articleId, function (err, project) {
            if (!project) {
                res.statusCode = 404;
                return res.json({
                    error: 'Not found'
                });
            }

            project.title = req.body.title;
            project.description = req.body.description;
            project.ownerId = req.body.ownerId;
            project.images = req.body.images;

            project.save(function (err) {
                if (!err) {
                    return res.json({status: 'OK',project: project});
                } else {
                    if (err.name === 'ValidationError') {
                        return res.status(400).json({error: 'Validation error'});
                    } else {
                        return res.status(500).json({error: 'Server error'});
                    }
                }
            });
        });
    });
});
/*N Удаление проекта*/
apiRoutes.delete('/project/:id', passport.authenticate('jwt', {session: false}), function (req, res){
    getCurrentUser(req, res, function(req, res, user) {
        var projectId = req.params.id;
        Project.findByIdAndRemove(projectId, function(err, project) {

        })
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Работа с файлами*/
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({ storage : storage}).single('fileName');
/*W*/
apiRoutes.post('/file', passport.authenticate('jwt', {session: false}), function (req, res){
    getCurrentUser(req, res, function(req, res, user) {
        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            return res.json(req.file);
        });
    });
});
/*N*/
apiRoutes.delete('/file:id', passport.authenticate('jwt', {session: false}), function (req, res){
    getCurrentUser(req, res, function(req, res, user) {

    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*N Работа с атачментами*/
apiRoutes.get('/attach/', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {

    });
});
apiRoutes.get('/attach/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*W Создание модели*/
apiRoutes.post('/attach/', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*N Изменение модели*/
apiRoutes.put('/attach/:id', passport.authenticate('jwt', {session: false}), function (req, res){
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*N Удаление модели*/
apiRoutes.delete('/attach/:id', passport.authenticate('jwt', {session: false}), function (req, res){
    getCurrentUser(req, res, function(req, res, user) {

    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*N Получение моделей*/
apiRoutes.get('/model/', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*N Пролучение модели по ID*/
apiRoutes.get('/model/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*W Создание модели*/
apiRoutes.post('/model/', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*N Изменение модели*/
apiRoutes.put('/model/:id', passport.authenticate('jwt', {session: false}), function (req, res){
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*N Удаление модели*/
apiRoutes.delete('/model/:id', passport.authenticate('jwt', {session: false}), function (req, res){
    getCurrentUser(req, res, function(req, res, user) {

    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*N Получение сцен*/
apiRoutes.get('/scene/', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*N Пролучение одной сцены по ID*/
apiRoutes.get('/scene/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*W Создание сцены*/
apiRoutes.post('/scene/', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*N Изменение сцены*/
apiRoutes.put('/scene/:id', passport.authenticate('jwt', {session: false}), function (req, res){
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*N Удаление сцены*/
apiRoutes.delete('/scene/:id', passport.authenticate('jwt', {session: false}), function (req, res){
    getCurrentUser(req, res, function(req, res, user) {

    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*N Получение информации для портфолио*/
apiRoutes.get('/portfolio/', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*N Пролучение одной portfolio по ID*/
apiRoutes.get('/portfolio/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*W Создание portfolio*/
apiRoutes.post('/portfolio/', passport.authenticate('jwt', {session: false}), function(req, res) {
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*N Изменение portfolio*/
apiRoutes.put('/portfolio/:id', passport.authenticate('jwt', {session: false}), function (req, res){
    getCurrentUser(req, res, function(req, res, user) {

    });
});
/*N Удаление portfolio*/
apiRoutes.delete('/portfolio/:id', passport.authenticate('jwt', {session: false}), function (req, res){
    getCurrentUser(req, res, function(req, res, user) {

    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Messaging
/*
* Сообщения привязываются к проекты или конкретному таску
* */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use('/api', apiRoutes);
app.listen(port);
console.log('Server Start at: http://localhost:' + port);