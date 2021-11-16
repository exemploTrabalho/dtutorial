var ipdata;
var fs = require("fs");
var http = require("http");
var os = require("os");
var addresses = [];

var interfaces = os.networkInterfaces();

fs.readFile("/hostip", "utf8", function (err, data) {
  console.log(data);
  ipdata = data;
});
var server = http
  .createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });

    response.write("host ip: " + ipdata + "\nother ip addresses:\n");
    for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family == "IPv4") {
          response.write(address.address);
          response.write("\n");
        }
      }
    }
    response.end();
  })
  .listen(8080);
