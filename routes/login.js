var libs     = '../../libs/';
var log      = require(libs + 'log')(module);
var passport = require('passport');

module.exports = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if(err) {
            next(err);
        } else {
            if(user) {
                req.logIn(user, function(err) {
                    if(err) {
                        next(err);
                    } else {
                        res.json({success: true});
                    }
                });
            } else {
                res.json({success: false, result: { error: 'Not Authorized' }});

            }
        }
    })(req, res, next);
};