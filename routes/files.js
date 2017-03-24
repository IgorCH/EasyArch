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
    res.json(req.files);
});

module.exports = router;