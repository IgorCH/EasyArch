var mongoose = require('mongoose');
var nconf = require('nconf');
nconf.argv().env().file({ file: './config/config.json' });
mongoose.connect(nconf.get("db:database"));

var hash = require("./passport/hash").hash;

var User = require('./models/user');
var Project = require('./models/project');
var Task = require('./models/task');
var Scene = require('./models/scene');
var Model = require('./models/model');

var Producers = require('./deploy_db_data/producers');

//-------------------------------------//

User.remove({}, function(err) {

    createProducers();

    hash('admin', function(err, salt, hash){
        if (err) throw err;
        
        var user = new User({
            email: 'admin@mail.com',
            salt: salt,
            hash: hash,
            name: 'admin',
            lng: 'RU',
            admin: true,
            manager: true,
            designer: true,
            client: true
        });
    
        user.save(function(err, user) {
            if(err) {
                return console.log(err);
            } else {
                console.log("New user - %s:%s:%s", user.id, user.name);
                createDB(user.id);
            }
        });
    });

    hash('manager', function(err, salt, hash) {
        if (err) throw err;

        var user2 = new User({
            email: 'manager@mail.com',
            salt: salt,
            hash: hash,
            name: 'manager',
            lng: 'RU',
            admin: false,
            manager: true,
            designer: true,
            client: true
        });

        user2.save(function (err, user) {
            if (err) {
                return console.log(err);
            } else {
                console.log("New user - %s:%s:%s", user.id, user.name);
            }
        });

    });

    hash('designer', function(err, salt, hash) {
        if (err) throw err;
        var user3 = new User({
            email: 'designer@mail.com',
            salt: salt,
            hash: hash,
            password: 'designer',
            name: 'designer',
            lng: 'RU',
            admin: false,
            manager: false,
            designer: true,
            client: true
        });

        user3.save(function (err, user) {
            if (err) {
                return console.log(err);
            } else {
                console.log("New user - %s:%s:%s", user.id, user.name);
            }
        });
    });

    hash('client', function(err, salt, hash) {
        if (err) throw err;
        var user4 = new User({
            email: 'client@mail.com',
            salt: salt,
            hash: hash,
            password: 'client',
            name: 'client',
            lng: 'RU',
            admin: false,
            manager: false,
            designer: false,
            client: true
        });

        user4.save(function (err, user) {
            if (err) {
                return console.log(err);
            } else {
                console.log("New user - %s:%s:%s", user.id, user.name);
            }
        });
    });

});

//-------------------------------------//

function createDB (userId) {
    Project.remove({}, function(err) {
        Task.remove({}, function(err) {

            var project1 = new Project({
                title: 'Project 1',
                authorId: userId,
                price: '100',
                status: 'Created'
            });

            project1.save(function(err, project) {
                if(!err) {
                    console.log("New Project - %s:%s:%s", project.title, project.authorId, userId);
                    var task1 = new Task({title: 'Task 1', authorId: userId, projectId: project.id});
                    task1.save(function(err, task) {
                        if(!err) {console.log("New Task - %s:%s:%s", task.title, task.authorId, task.id);}
                        else {return console.log(err);}
                    });
                    var task2 = new Task({title: 'Task 2', authorId: userId, projectId: project.id});
                    task2.save(function(err, task) {
                        if(!err) {console.log("New Task - %s:%s:%s", task.title, task.authorId, task.id);}
                        else {return console.log(err);}
                    });
                } else {
                    return console.log(err);
                }
            });

            var project2 = new Project({
                title: 'Project 2',
                authorId: userId,
                price: '100',
                status: 'Created'
            });

            project2.save(function(err, project) {
                if(!err) {
                    console.log("New Project - %s:%s", project2.title, project2.authorId);
                    var task1 = new Task({title: 'Task 1', authorId: userId, projectId: project.id});
                    task1.save(function(err, task) {
                        if(!err) {console.log("New Task - %s:%s:%s", task.title, task.authorId, task.id);}
                        else {return console.log(err);}
                    });
                    var task2 = new Task({title: 'Task 2', authorId: userId, projectId: project.id});
                    task2.save(function(err, task) {
                        if(!err) {console.log("New Task - %s:%s", task.title, task.authorId, task.id);}
                        else {return console.log(err);}
                    });
                }
                else {return console.log(err);}
            });
        });
    });

    //-------------------------------------//

    Scene.remove({}, function(err) {
        var newScene1 = new Scene({title: 'Scene 1', authorId: userId, url: '1'});
        newScene1.save(function (err, client) {
            if (!err) { console.log("New scene - %s:%s:%s", newScene1.title, newScene1.authorId, newScene1.url); }
            else { return console.log(err); }
        });
        var newScene2 = new Scene({title: 'Scene 2', authorId: userId, url: '2'});
        newScene2.save(function (err, client) {
            if (!err) { console.log("New scene - %s:%s:%s", newScene2.title, newScene2.authorId, newScene2.url); }
            else { return console.log(err); }
        });
        var newScene3 = new Scene({title: 'Scene 3', authorId: userId, url: '3'});
        newScene3.save(function (err, client) {
            if (!err) { console.log("New scene - %s:%s:%s", newScene3.title, newScene3.authorId, newScene3.url); }
            else { return console.log(err); }
        });
        var newScene4 = new Scene({title: 'Scene 4', authorId: userId, url: '4'});
        newScene4.save(function (err, client) {
            if (!err) { console.log("New scene - %s:%s:%s", newScene4.title, newScene4.authorId, newScene4.url); }
            else { return console.log(err); }
        });
        var newScene5 = new Scene({title: 'Scene 5', authorId: userId, url: '5'});
        newScene5.save(function (err, client) {
            if (!err) { console.log("New scene - %s:%s:%s", newScene5.title, newScene5.authorId, newScene5.url); }
            else { return console.log(err); }
        });
    });

    //-------------------------------------//

    Model.remove({}, function(err) {
        var newModel1 = new Model({title: 'Model 1', authorId: userId, url: '1'});
        newModel1.save(function(err, client) {
            if(!err) {console.log("New model - %s:%s:%s", newModel1.title, newModel1.authorId, newModel1.url);}
            else { return console.log(err);}
        });
        var newModel2 = new Model({title: 'Model 2', authorId: userId, url: '2'});
        newModel2.save(function(err, client) {
            if(!err) {console.log("New model - %s:%s:%s", newModel2.title, newModel2.authorId, newModel2.url);}
            else { return console.log(err);}
        });
        var newModel3 = new Model({title: 'Model 3', authorId: userId, url: '3'});
        newModel3.save(function(err, client) {
            if(!err) {console.log("New model - %s:%s:%s", newModel3.title, newModel3.authorId, newModel3.url);}
            else { return console.log(err);}
        });
        var newModel4 = new Model({title: 'Model 4', authorId: userId, url: '4'});
        newModel4.save(function(err, client) {
            if(!err) {console.log("New model - %s:%s:%s", newModel4.title, newModel4.authorId, newModel4.url);}
            else { return console.log(err);}
        });
        var newModel5 = new Model({title: 'Model 5', authorId: userId, url: '5'});
        newModel5.save(function(err, client) {
            if(!err) {console.log("New model - %s:%s:%s", newModel5.title, newModel5.authorId, newModel5.url);}
            else { return console.log(err);}
        });
    });
}

function createProducers () {
    console.log(Producers);
}
//-------------------------------------//

setTimeout(function() {
    //db.disconnect();
}, 3000);