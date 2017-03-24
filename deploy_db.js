var nconf = require('nconf');
nconf.argv().env().file({ file: './config/config.json' });

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(nconf.get("db:database"));

var hash = require("./passport/hash").hash;
var User = require('./models/user');
var ProjectModels = require('./models/project');
var Project = ProjectModels.Project;
var Task = ProjectModels.Task;
var Message = ProjectModels.Message;
var Scene = require('./models/scene');
var Model = require('./models/model');

var Producers = require('./deploy_db_data/producers');

//-------------------------------------//

User.remove({}, function(err) {
    createProducers();
    var admin, manager, designer, client;

    hash('admin', function(err, salt, hash){
        if (err) throw err;
        
        admin = new User({
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

        admin.save(function(err) {
            if(err) {
                return console.log(err);
            } else {
                console.log("New user - %s:%s", admin.id, admin.name);
            }
        });
    });

    hash('manager', function(err, salt, hash) {
        if (err) throw err;

        manager = new User({
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

        manager.save(function (err) {
            if (err) {
                return console.log(err);
            } else {
                console.log("New user - %s:%s", manager.id, manager.name);
            }
        });

    });

    hash('designer', function(err, salt, hash) {
        if (err) throw err;
        designer = new User({
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

        designer.save(function (err) {
            if (err) {
                return console.log(err);
            } else {
                console.log("New user - %s:%s", designer.id, designer.name);
            }
        });
    });

    hash('client', function(err, salt, hash) {
        if (err) throw err;
        client = new User({
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

        client.save(function (err) {
            if (err) {
                return console.log(err);
            } else {
                console.log("New user - %s:%s", client.id, client.name);
            }
        });
    });

    setTimeout(function(){
        createDB(admin, manager, designer, client);
    }, 1000);

});

//-------------------------------------//

function createDB (admin, manager, designer, client) {
    console.log(arguments);
    Project.remove({}, function(err) {
        var task1 = new Task({
            title: "Title",
            description: "Description of task",
            params: '{"json": "json"}',
            designer: designer,
            models: [],
            attachments: [],
            todo: [],
            messages: [{
                sender: manager,
                text: 'Hello Client',
                attachments: '',
                clientVisible: true
            },{
                sender: designer,
                text: 'I am designer at this project',
                attachments: '',
                clientVisible: true
            },{
                sender: client,
                text: 'Thanks',
                attachments: '',
                clientVisible: true
            }],
            results: []
        });

        var project1 = new Project({
            title: 'Project 1',
            client: client,
            description: 'Project description',
            manager: manager,
            tasks: [task1]
        });

        project1.save(function(err) {
            if(!err) {
                console.log("New Project - %s:%s", project1.title, project1.client.id);
            } else {
                return console.log(err);
            }
        });

        //var task11 = new Task({
        //    title: "Title",
        //    description: "Description of task",
        //    params: '{"json": "json"}',
        //    designer: designer,
        //    models: [],
        //    attachments: [],
        //    todo: [],
        //    messages: [],
        //    results: []
        //});
        //
        //var project11 = new Project({
        //    title: 'Project 1',
        //    client: client,
        //    description: 'Project description',
        //    manager: manager,
        //    tasks: [task11]
        //});
        //
        //project11.save(function(err) {
        //    if(!err) {
        //        console.log("New Project - %s:%s", project11.title, project11.client.id);
        //    } else {
        //        return console.log(err);
        //    }
        //});
        //
        //var project2 = new Project({
        //    title: 'Project 2',
        //    client: user,
        //    price: '100',
        //    tasks: [
        //        {
        //            title: "Title",
        //            description: "Description of task"
        //        }
        //    ]
        //});
        //
        //project2.save(function(err, project) {
        //        if(!err) {
        //            console.log("New Project - %s:%s", project2.title, project2.client.id);
        //        }
        //        else {return console.log(err);}
        //    });
    });

    //-------------------------------------//

    Scene.remove({}, function(err) {
        var newScene1 = new Scene({title: 'Scene 1', authorId: designer, url: '1'});
        newScene1.save(function (err, client) {
            if (!err) { console.log("New scene - %s:%s:%s", newScene1.title, newScene1.authorId.id, newScene1.url); }
            else { return console.log(err); }
        });
        var newScene2 = new Scene({title: 'Scene 2', authorId: designer, url: '2'});
        newScene2.save(function (err, client) {
            if (!err) { console.log("New scene - %s:%s:%s", newScene2.title, newScene2.authorId.id, newScene2.url); }
            else { return console.log(err); }
        });
        var newScene3 = new Scene({title: 'Scene 3', authorId: designer, url: '3'});
        newScene3.save(function (err, client) {
            if (!err) { console.log("New scene - %s:%s:%s", newScene3.title, newScene3.authorId.id, newScene3.url); }
            else { return console.log(err); }
        });
        var newScene4 = new Scene({title: 'Scene 4', authorId: designer, url: '4'});
        newScene4.save(function (err, client) {
            if (!err) { console.log("New scene - %s:%s:%s", newScene4.title, newScene4.authorId.id, newScene4.url); }
            else { return console.log(err); }
        });
        var newScene5 = new Scene({title: 'Scene 5', authorId: designer, url: '5'});
        newScene5.save(function (err, client) {
            if (!err) { console.log("New scene - %s:%s:%s", newScene5.title, newScene5.authorId.id, newScene5.url); }
            else { return console.log(err); }
        });
    });

    //-------------------------------------//

    Model.remove({}, function(err) {
        var newModel1 = new Model({title: 'Model 1', authorId: designer, url: '1'});
        newModel1.save(function(err, client) {
            if(!err) {console.log("New model - %s:%s:%s", newModel1.title, newModel1.authorId.id, newModel1.url);}
            else { return console.log(err);}
        });
        var newModel2 = new Model({title: 'Model 2', authorId: designer, url: '2'});
        newModel2.save(function(err, client) {
            if(!err) {console.log("New model - %s:%s:%s", newModel2.title, newModel2.authorId.id, newModel2.url);}
            else { return console.log(err);}
        });
        var newModel3 = new Model({title: 'Model 3', authorId: designer, url: '3'});
        newModel3.save(function(err, client) {
            if(!err) {console.log("New model - %s:%s:%s", newModel3.title, newModel3.authorId.id, newModel3.url);}
            else { return console.log(err);}
        });
        var newModel4 = new Model({title: 'Model 4', authorId: designer, url: '4'});
        newModel4.save(function(err, client) {
            if(!err) {console.log("New model - %s:%s:%s", newModel4.title, newModel4.authorId.id, newModel4.url);}
            else { return console.log(err);}
        });
        var newModel5 = new Model({title: 'Model 5', authorId: designer, url: '5'});
        newModel5.save(function(err, client) {
            if(!err) {console.log("New model - %s:%s:%s", newModel5.title, newModel5.authorId.id, newModel5.url);}
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