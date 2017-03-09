var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var format = require('util').format;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({
    "uploadDir": process.cwd() + '/public'
});

const path = require('path');

router.post('/upload', multipartMiddleware, function(req, res) {
    console.log("------------------------------------------------------");
    console.log(req.files);//. input name
    console.log("------------------------------------------------------");

    //console.log(path.relative(process.cwd() + '/public',
    //            req.files.image.path));

    // Project.findById(req.body.projectId, function (err, project) {
    //     if(project) {
    //         if(req.files.files.originalFilename) {
    //             project.files.push({
    //                 name: req.files.files.originalFilename,
    //                 type: req.files.files.type,
    //                 path: req.files.files.path
    //             });
    //         } else {
    //             for (var i=0; i<req.files.length;i++) {
    //                 project.files.push({
    //                     name: req.files.files[i].originalFilename,
    //                     type: req.files.files[i].type,
    //                     path: req.files.files[i].path
    //                 });
    //             }
    //         }
    //
    //         project.save(function (err) {
    //             if (!err) {
    //                 log.info("Project with id: %s updated", project.id);
    //                 return res.json({
    //                     status: 'OK',
    //                     project: project
    //                 });
    //             } else {
    //                 res.statusCode = 400;
    //                 res.json({
    //                     error: 'Save error'
    //                 });
    //             }
    //         });
    //     } else {
    //         console.log('файл не найден');
    //     }
    // });
});

module.exports = router;