var express = require('express');
var router = express.Router();

var Project = require('../models/project');
var Task = require('../models/task');
var passport = require('../passport/passport');

router.get('/', passport.isClient, function(req, res) {
    Project.find(function (err, projects) {
        if (!err) {
            return res.json({message: "ok", projects: projects});
        } else {
            return res.status(500).json({message: 'Error'});
        }
    });
});

router.post('/', passport.isClient, function(req, res) {

    var project = new Project({
        title: req.query.title,
        authorId: req.session.user.id
    });

    project.save(function (err) {
        if (!err) {
            return res.json({message: 'ok', project: project});
        } else {
            if(err.name === 'ValidationError') {
                res.status(400).json({message: 'Validation error'});
            } else {
                res.status(500).json({message: 'Server error'});
            }
        }
    });
});

router.get('/:id', passport.isClient, function(req, res) {

    Project.findById(req.params.id, function (err, project) {

        if(!project) {
            return res.status(400).json({message: 'Not found'});
        }

        if (!err) {
            Task.find({ projectId:  project.id }, function(err, tasks) {
                if(!err) {
                    return res.json({
                        message: 'ok',
                        project: project,
                        tasks: tasks
                    });
                } else {
                    return res.status(500).json({message: 'Server error'});
                }
            });
        } else {
            return res.status(500).json({message: 'Server error'});
        }
    });
});

router.put('/:id', passport.isClient, function (req, res){
    var projectId = req.params.id;

    Project.findById(projectId, function (err, project) {
        if(!project) {
            return res.status(404).json({message: 'Not found'});
        }

         project.title = req.body.title;
         project.description = req.body.description;
         project.author = req.body.author;
         project.images = req.body.images;

         project.save(function (err) {
            if (!err) {
                return res.json({message: 'ok', project: project});
            } else {
                if(err.name === 'ValidationError') {
                    return res.status(400).json({message: 'Validation error'});
                } else {
                    return res.status(500).json({message: 'Server error'});
                }
            }
        });
    });
});

module.exports = router;