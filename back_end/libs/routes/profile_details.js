var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = '../../libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var User = require(libs + 'model/User');

var auth = function(req, res, next){
    if (!req.isAuthenticated())
        res.sendStatus(401);
    else
        next();
};

router.get('/:id', auth, function(req, res) {
    User.findById(req.params.id, function (err, profile) {
        if(!profile) {
            return res.json({
                success: true,
                error: 'Not found'
            });
        }
        if (!err) {
            return res.json({
                success: true,
                profile: profile
            });
        } else {
            return res.json({
                success: false,
                error: 'Server error'
            });
        }
    });
});

router.put('/:id', auth, function (req, res){
    var userId = req.params.id;

    User.findById(userId, function (err, user) {



        if(!user) {
            res.statusCode = 404;
            return res.json({
                error: 'User Not found'
            });
        }

        user.name = req.query.name;
        user.lng = req.query.lng;

        user.save(function (err) {
            if (!err) {
                return res.json({
                    status: 'OK',
                    user: user
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
            }
        });
    });
});

module.exports = router;