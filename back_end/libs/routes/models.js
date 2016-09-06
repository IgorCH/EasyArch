var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = '../../libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var Model = require(libs + 'model/model');

var auth = function(req, res, next){
    if (!req.isAuthenticated())
        res.sendStatus(401);
    else
        next();
};


router.get('/', auth, function(req, res) {
    Model.find(function (err, models) {
        if (!err) {
            return res.json(models);
        } else {
            res.statusCode = 500;

            log.error('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error: 'Server error'
            });
        }
    });
});

router.post('/', passport.authenticate('local', { session: false }), function(req, res) {

   /* var project = new Project({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        images: req.body.images
    });

    project.save(function (err) {
        if (!err) {
            log.info("New article created with id: %s", article.id);
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
    });*/
});

router.get('/:id', passport.authenticate('local', { session: false }), function(req, res) {
/*
    Project.findById(req.params.id, function (err, article) {

        if(!article) {
            res.statusCode = 404;

            return res.json({
                error: 'Not found'
            });
        }

        if (!err) {
            return res.json({
                status: 'OK',
                article:article
            });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);

            return res.json({
                error: 'Server error'
            });
        }
    });*/
});

router.put('/:id', passport.authenticate('local', { session: false }), function (req, res){
   /* var projectId = req.params.id;

    Project.findById(articleId, function (err, article) {
        if(!article) {
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
    });*/
});

module.exports = router;