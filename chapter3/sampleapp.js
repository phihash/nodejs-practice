const http = require("http");
const fs = require("fs");
const server = http.createServer();

server.on("request",doRequest);
server.listen(1234);
// server.listen(process.env.PORT, process.env.IP);
console.log("Server Runnning");

function doRequest(req,res){
  res.writeHead(200,{'Content-Type': 'text/plain'});
  res.write("Hello World");
  res.end();
}