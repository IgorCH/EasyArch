var libs = '../../libs/';
var log = require(libs + 'log')(module);
var User = require(libs + 'model/User');

module.exports = function(req, res, next) {
    var user = new User({
        email: req.body.email,
        pass: req.body.pass,
        name: req.body.name
    });
    //console.log(user);
    user.save(function(err) {
        if(err) {
            next(err);
        } else {
            req.login(user, function(err) {
                if (err) {
                    next(err);
                } else {
                    res.redirect('/');
                }
            });
        }

    });
};