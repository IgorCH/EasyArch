var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = '../../libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');

router.get('/', function(req, res) {

    return res.json({
        portfolio: 'OK',
        success: true
    });

    /*Project.find(function (err, projects) {
        if (!err) {
            return res.json(projects);
            //TODO +Всю информацию для фильтров
            //TODO +Локализацию
            //люди
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.json({
                error: 'Server error'
            });
        }
    });*/
});

router.post('/', function(req, res) {

    var project = new Project({
        title: req.query.title,
        authorId: '12123'
    });

    project.save(function (err) {
        if (!err) {
            log.info("New Project created with id: %s", project.id);
            return res.json({
                status: 'OK',
                project: project
            });
        } else {
            if(err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;
                res.json({
                    error: 'Server error'
                });
            }
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
});

router.get('/:id', function(req, res) {

    Project.findById(req.params.id, function (err, project) {

        if(!project) {
            res.statusCode = 404;
            return res.json({
                error: 'Not found'
            });
        }

        if (!err) {
            log.info("Getted Project created with id: %s", project.id);
            Task.find({ projectId:  project.id }, function(err, tasks) {
                if(!err) {
                    return res.json({
                        status: 'OK',
                        project: project,
                        tasks: tasks
                    });
                } else {
                    console.log('error');
                }
            });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.json({
                error: 'Server error'
            });
        }
    });
});

router.put('/:id', function (req, res){
    var projectId = req.params.id;

    Project.findById(articleId, function (err, project) {
        if(!project) {
            res.statusCode = 404;
            log.error('Article with id: %s Not Found', projectId);
            return res.json({
                error: 'Not found'
            });
        }

         project.title = req.body.title;
         project.description = req.body.description;
         project.author = req.body.author;
         project.images = req.body.images;

         project.save(function (err) {
            if (!err) {
                log.info("Project with id: %s updated", project.id);
                return res.json({
                    status: 'OK',
                    project:project
                });
            } else {
                if(err.name === 'ValidationError') {
                    res.statusCode = 400;
                    return res.json({
                        error: 'Validation error'
                    });
                } else {
                    res.statusCode = 500;
                    return res.json({
                        error: 'Server error'
                    });
                }
                //log.error('Internal error (%d): %s', res.statusCode, err.message);
            }
        });
    });
});

module.exports = router;