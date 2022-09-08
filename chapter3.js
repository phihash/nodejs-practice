const http = require("http");
const server = http.createServer();
server.on("request",doRequest);
// server.listen(1234);
server.listen(process.env.PORT, process.env.IP);
console.log("Server Runnning");
function doRequest(req,res){
  res.writeHead(200,{"Content-Type":"text/plain"});
  res.write("送りたいテキスト")
  res.end();
}
