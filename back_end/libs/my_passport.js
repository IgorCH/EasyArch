var libs = '../libs/';
var log = require('./log')(module);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require(libs + 'model/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass'
}, function (email, password, done) {
    User.findOne({email: email}, function (err, user) {
        if (err) {
            done(err);
        } else {
            if (user) {
                if (password === user.pass) {
                    done(null, user);
                } else {
                    done(null, false, {message: 'Incorrect password.'})
                }
            } else {
                done(null, false, {message: 'Incorrect username.'});
            }
        }
    });
}));

passport.serializeUser(function (user, done) {
    console.log(['serialize', user.id]);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log(['de-serialize', id]);
    User.findById(id, function (err, user) {
        if(err) {
            done(err)
        } else {
            done(null, user);
        }
    });
});

module.exports = passport;