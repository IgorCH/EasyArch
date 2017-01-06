var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = '../../libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var Task = require(libs + 'model/task');

var auth = function(req, res, next){
    if (!req.isAuthenticated())
        res.sendStatus(401);
    else
        next();
};

router.get('/', auth, function(req, res) {
    Task.find(function (err, tasks) {
        if (!err) {
            return res.json(tasks);
        } else {
            res.statusCode = 500;

            log.error('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error: 'Server error'
            });
        }
    });
});

router.post('/', auth, function(req, res) {

    var task = new Task({
        title: req.query.title,
        projectId: req.query.projectId,
        authorId: req.user.id
    });

    console.log(task);

    task.save(function (err) {
        if (!err) {
            return res.json({
                status: 'OK',
                task: task
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

router.get('/:id', auth, function(req, res) {

    Task.findById(req.params.id, function (err, task) {

        if(!task) {
            res.statusCode = 404;

            return res.json({
                error: 'Not found'
            });
        }

        if (!err) {
            return res.json({
                status: 'OK',
                task: task
            });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode, err.message);

            return res.json({
                error: 'Server error'
            });
        }
    });
});

router.put('/:id', auth, function (req, res){
    var taskId = req.params.id;

    Task.findById(taskId, function (err, task) {
        if(!task) {
            res.statusCode = 404;
            log.error('Article with id: %s Not Found', taskId);
            return res.json({
                error: 'Not found'
            });
        }

        task.title = req.query.title;
        task.description = req.query.description;
        //task.authorId = req.body.author;
        //task.images = req.body.images;

        task.save(function (err) {
            if (!err) {
                log.info("Project with id: %s updated", project.id);
                return res.json({
                    status: 'OK',
                    task: task
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