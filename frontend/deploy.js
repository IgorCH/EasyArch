var fs = require("fs");
var EasyFTP = require('easy-ftp');
var ftp = new EasyFTP();
var contents = fs.readFileSync("ftp.json");
var config = JSON.parse(contents);

ftp.connect(config);

var dirs = ["dist/assets", "dist/bower_components", "dist/scripts", "dist/views"];
ftp.upload(dirs, "/home/dadev/www/new_style", function(err) {
  console.log('Errors - ', err);

  var files = ["dist/favicon.png", "dist/robots.txt", "dist/index.html"];
  ftp.upload(files, "/home/dadev/www/new_style", function(err) {
    console.log('Done, Errors - ', err);
    ftp.close();
  });

});











//ftp.cd("/", function(err, path){});
//ftp.rm("/filename", function(err){});
//ftp.mkdir("/directory", function(err){});
//ftp.mv("/filename", "/newFilename", function(err, newPath){});
//ftp.ls("/directory", function(err, list){});
//ftp.pwd(function(err, path) {
//  console.log('path', path);
//});
//ftp.upload("/test.txt", "/test.txt", function(err){});  	//result => /test.txt
//ftp.upload("/test.txt", "/test123.txt", function(err){});  //result => /test123.txt
//ftp.upload("/test.txt", "/", function(err){});			//result => /test.txt
//ftp.upload("/directory", "/", function(err){});			//result => /directory
//var arr = [{local:"/test.txt", remote:"/test.txt"}, {local:"/test1.txt", remote:"/abcd/test2.txt"}, {local:"/directory", remote:"/"}];
//ftp.upload(arr, function(err){});	// 2 arguments;
//var arr = ["/test.txt", "/abcd/test2.txt", "/directory"];
//ftp.upload(arr, "/", function(err){});	// 3 arguments;
//var arr = [{local:"/test.txt", remote:"/directory/test.txt"}, "/abcd/test2.txt", "/directory"];
//ftp.upload(arr, "/", function(err){});	// 3 arguments;
//ftp.download("/test.txt", "/test.txt", function(err){});	//result => /test.txt
//ftp.download("/test.txt", "/test123.txt", function(err){});	//result => /test123.txt
//ftp.download("/test.txt", "/", function(err){});		//result => /test.txt
//ftp.download("/directory", "/", function(err){});		//result => /directory
//var arr = [{remote:"/test.txt", local:"/test.txt"}, {remote:"/test1.txt", local:"/abcd/test2.txt"}, {remote:"/directory", local:"/"}];
//ftp.download(arr, function(err){});	// 2 arguments;
//var arr = ["/test.txt", "/abcd/test2.txt", "/directory"];
//ftp.download(arr, "/", function(err){});	// 3 arguments;
//var arr = [{remote:"/test.txt", local:"/directory/test.txt"}, "/abcd/test2.txt", "/directory"];
//ftp.download(arr, "/", function(err){});	// 3 arguments;
//ftp.close();