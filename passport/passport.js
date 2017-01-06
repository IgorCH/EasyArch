var _ = require("lodash");

var express = require("express");
var router = express.Router();

var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var users = require("../models/user");

var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: 'ea_passport_secret_key__IROIG@#$%^&*(){_)*(^&%#MFIL'
};

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    var user = users[_.findIndex(users, {id: jwt_payload.id})];
    next(null, user || false);
});

passport.use(strategy);

router.post("/registration", function(req, res) {

});

router.post("/login", function(req, res) {

    if(req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
    }

    // usually this would be a database call:
    var user = users[_.findIndex(users, {name: name})];
    if(!user) {
        res.status(401).json({message: "User not found"});
    }

    if(user.password === req.body.password) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        var payload = {id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ message: "ok", token: token });
    } else {
        res.status(401).json({message: "Pass did not match"});
    }

});

router.post("/logout", function(req, res) {

});

router.get("/list", function(req, res) {
    users.find({}, function(err, users) {
        res.json(users);
    });
});

router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json({message: "Success! You can not see this without a token"});
});

router.get("/secretDebug",
  function(req, res, next){
      console.log(req.get('Authorization'));
      next();
  }, function(req, res){
      res.json("debugging");
  });

module.exports = {
    passport: passport,
    router: router
};