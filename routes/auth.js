var nconf = require("nconf");
var express = require("express");
var passport = require("../passport/passport");
var hash = require("../passport/hash").hash;
var router = express.Router();

var User = require("../models/user");

router.post("/registration", function(req, res, next) {

    if(req.body.email && req.body.name && req.body.password) {

        hash('foobar', function (err, salt, hash) {

            var user = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                salt: salt,
                hash: hash
            });

            user.save(function (err) {
                if (!err) {
                    req.session.regenerate(function(){
                        req.session.user = user;
                        res.json({message: "ok", user: user });
                    });
                } else {
                    res.status(401).json({message: "error"});
                }
            });

        });
    }

});

router.post("/login", function(req, res) {

    if(req.body.email && req.body.password) {

        User.findOne({email: req.body.email}).exec(function (err, user) {
            if (!user) {
                res.status(401).json({message: "User not found"});
            }

            hash(req.body.password, user.salt, function (err, hash) {
                if (hash == user.hash) {
                    req.session.regenerate(function () {
                        req.session.user = user;
                        res.json({message: "ok", user: user});
                    });
                } else {
                    res.status(401).json({message: "Pass did not match"});
                }

            });

        });
    }
});

router.get("/logout", function(req, res) {
    req.session.destroy(function(err){
        if(err){
            res.status(401).json({message: "error"});
        } else {
            res.json({message: "ok"});
        }
    });
});

router.get("/list", passport.isDesigner, function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

router.get("/list2", function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

router.get("/secret", function(req, res){
    res.json({message: "Success! You can not see this without a token"});
});

router.get("/secretDebug",
  function(req, res, next) {
      console.log(req.get('Authorization'));
      next();
  }, function(req, res) {
      res.json("debugging");
  });

module.exports = router;
