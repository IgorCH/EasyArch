var nconf = require("nconf");
var express = require("express");
var router = express.Router();

var User = require("../models/user");

var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: nconf.get("passport:secretKey")
};

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    User.findOne({_id: jwt_payload._id}, function(err, user){
        next(null, user || false);
    });
});

passport.use(strategy);

router.post("/registration", function(req, res, next) {

    var user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        lng: 'RU'
    });

    user.save(function(err) {
        if(err) {
            next(err);
        } else {
            var payload = {_id: user._id};
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            req.session.email = req.body.email;
            req.session.token = token;
            res.json({ token: token, user: user });
        }

    });

});

router.post("/login", function(req, res) {

    if(req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
    }

    User.findOne({email: email}).exec(function(err, user){
        if(!user) {
            res.status(401).json({message: "User not found"});
        }

        if(user.password === req.body.password) {
            var payload = {_id: user._id};
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            req.session.email = req.body.email;
            req.session.token = token;
            res.json({ token: token, user: user });
        } else {
            res.status(401).json({message: "Pass did not match"});
        }
    });

});

router.post("/logout", function(req, res) {
    req.session.destroy(function(err){
        if(err){
            res.status(401).json({message: "error"});
        } else {
            res.json({message: "ok"});
        }
    });
});

router.get("/list", passport.authenticate('jwt', { session: false }), function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

router.get("/list2", function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json({message: "Success! You can not see this without a token"});
});

router.get("/secretDebug",
  function(req, res, next) {
      console.log(req.get('Authorization'));
      next();
  }, function(req, res) {
      res.json("debugging");
  });

module.exports = {
    passport: passport,
    router: router
};