var faker = require('faker');

var libs = './libs/';

var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var config = require(libs + 'config');

var User = require(libs + 'model/user');
var Project = require(libs + 'model/project');
var Task = require(libs + 'model/task');
var Scene = require(libs + 'model/scene');
var Model = require(libs + 'model/model');

var Producers = require('./ProducersData');

//-------------------------------------//

User.remove({}, function(err) {

    createProducers();

    var user = new User({
        email: 'igor@mail.ru',
        pass: 'pass',
        name: 'igor',
        lng: 'RU'
    });

    user.save(function(err, user) {
        if(err) {
            return log.error(err);
        }else {
            log.info("New user - %s:%s:%s", user.id, user.name, user.pass);
            createDB(user.id);
        }
    });

    var user2 = new User({
        email: 'igor2@mail.ru',
        pass: 'pass',
        name: 'igor',
        lng: 'EN'
    });

    user2.save(function(err, user) {
        if(err) {
            return log.error(err);
        }else {
            log.info("New user - %s:%s:%s", user.id, user.name, user.pass);
        }
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
                    log.info("New Project - %s:%s:%s", project.title, project.authorId, userId);
                    var task1 = new Task({title: 'Task 1', authorId: userId, projectId: project.id});
                    task1.save(function(err, task) {
                        if(!err) {log.info("New Task - %s:%s:%s", task.title, task.authorId, task.id);}
                        else {return log.error(err);}
                    });
                    var task2 = new Task({title: 'Task 2', authorId: userId, projectId: project.id});
                    task2.save(function(err, task) {
                        if(!err) {log.info("New Task - %s:%s:%s", task.title, task.authorId, task.id);}
                        else {return log.error(err);}
                    });
                } else {
                    return log.error(err);
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
                    log.info("New Project - %s:%s", project2.title, project2.authorId);
                    var task1 = new Task({title: 'Task 1', authorId: userId, projectId: project.id});
                    task1.save(function(err, task) {
                        if(!err) {log.info("New Task - %s:%s:%s", task.title, task.authorId, task.id);}
                        else {return log.error(err);}
                    });
                    var task2 = new Task({title: 'Task 2', authorId: userId, projectId: project.id});
                    task2.save(function(err, task) {
                        if(!err) {log.info("New Task - %s:%s", task.title, task.authorId, task.id);}
                        else {return log.error(err);}
                    });
                }
                else {return log.error(err);}
            });
        });
    });

    //-------------------------------------//

    Scene.remove({}, function(err) {
        var newScene1 = new Scene({title: 'Scene 1', authorId: userId, url: '1'});
        newScene1.save(function (err, client) {
            if (!err) { log.info("New scene - %s:%s:%s", newScene1.title, newScene1.authorId, newScene1.url); }
            else { return log.error(err); }
        });
        var newScene2 = new Scene({title: 'Scene 2', authorId: userId, url: '2'});
        newScene2.save(function (err, client) {
            if (!err) { log.info("New scene - %s:%s:%s", newScene2.title, newScene2.authorId, newScene2.url); }
            else { return log.error(err); }
        });
        var newScene3 = new Scene({title: 'Scene 3', authorId: userId, url: '3'});
        newScene3.save(function (err, client) {
            if (!err) { log.info("New scene - %s:%s:%s", newScene3.title, newScene3.authorId, newScene3.url); }
            else { return log.error(err); }
        });
        var newScene4 = new Scene({title: 'Scene 4', authorId: userId, url: '4'});
        newScene4.save(function (err, client) {
            if (!err) { log.info("New scene - %s:%s:%s", newScene4.title, newScene4.authorId, newScene4.url); }
            else { return log.error(err); }
        });
        var newScene5 = new Scene({title: 'Scene 5', authorId: userId, url: '5'});
        newScene5.save(function (err, client) {
            if (!err) { log.info("New scene - %s:%s:%s", newScene5.title, newScene5.authorId, newScene5.url); }
            else { return log.error(err); }
        });
    });

    //-------------------------------------//

    Model.remove({}, function(err) {
        var newModel1 = new Model({title: 'Model 1', authorId: userId, url: '1'});
        newModel1.save(function(err, client) {
            if(!err) {log.info("New model - %s:%s:%s", newModel1.title, newModel1.authorId, newModel1.url);}
            else { return log.error(err);}
        });
        var newModel2 = new Model({title: 'Model 2', authorId: userId, url: '2'});
        newModel2.save(function(err, client) {
            if(!err) {log.info("New model - %s:%s:%s", newModel2.title, newModel2.authorId, newModel2.url);}
            else { return log.error(err);}
        });
        var newModel3 = new Model({title: 'Model 3', authorId: userId, url: '3'});
        newModel3.save(function(err, client) {
            if(!err) {log.info("New model - %s:%s:%s", newModel3.title, newModel3.authorId, newModel3.url);}
            else { return log.error(err);}
        });
        var newModel4 = new Model({title: 'Model 4', authorId: userId, url: '4'});
        newModel4.save(function(err, client) {
            if(!err) {log.info("New model - %s:%s:%s", newModel4.title, newModel4.authorId, newModel4.url);}
            else { return log.error(err);}
        });
        var newModel5 = new Model({title: 'Model 5', authorId: userId, url: '5'});
        newModel5.save(function(err, client) {
            if(!err) {log.info("New model - %s:%s:%s", newModel5.title, newModel5.authorId, newModel5.url);}
            else { return log.error(err);}
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