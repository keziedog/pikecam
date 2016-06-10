fs = require('fs');
http = require('http');
url = require('url');
var v4l2camera = require("v4l2camera");
var cam = new v4l2camera.Camera("/dev/video0");

http.createServer(function(req, res){
  var request = url.parse(req.url, true);
  var action = request.pathname;
  
  if (action == '/still') {
  	//cam.configSet({width: 1024, height: 768, format: 1195724874, formatName: "JPEG"});
  	cam.configSet({width: 3280, height: 2464, format: 1195724874, formatName: "JPEG"});
    if (cam.configGet().formatName !== "JPEG") {
      console.log("NOTICE: JPEG camera required");
      process.exit(1);
    }
    cam.start();

    cam.capture(function (success) {
      res.writeHead(200, {'Content-Type': 'image/jpeg' });
      res.end(Buffer(cam.frameRaw()), 'binary');
    });
    
  } else { 
     res.writeHead(200, {'Content-Type': 'text/plain' });
     res.end('Hello World \n');
  }
}).listen(8080);

