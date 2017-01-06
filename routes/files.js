var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = '../../libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var Project = require(libs + 'model/project');

var auth = function(req, res, next){
    if (!req.isAuthenticated())
        res.sendStatus(401);
    else
        next();
};

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.post('/', multipartMiddleware, auth, function(req, res) {
    console.log("------------------------------------------------------");
    console.log(req.files);
    console.log("------------------------------------------------------");

    Project.findById(req.body.projectId, function (err, project) {
        if(project) {
            if(req.files.files.originalFilename) {
                project.files.push({
                    name: req.files.files.originalFilename,
                    type: req.files.files.type,
                    path: req.files.files.path
                });
            } else {
                for (var i=0; i<req.files.length;i++) {
                    project.files.push({
                        name: req.files.files[i].originalFilename,
                        type: req.files.files[i].type,
                        path: req.files.files[i].path
                    });
                }
            }

            project.save(function (err) {
                if (!err) {
                    log.info("Project with id: %s updated", project.id);
                    return res.json({
                        status: 'OK',
                        project: project
                    });
                } else {
                    res.statusCode = 400;
                    res.json({
                        error: 'Save error'
                    });
                }
            });
        } else {
            console.log('файл не найден');
        }
    });
});

module.exports = router;