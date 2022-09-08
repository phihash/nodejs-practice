const http = require("http");
const fs = require("fs");
const server = http.createServer();
server.on("request",doRequest);
// server.listen(1234);
server.listen(process.env.PORT, process.env.IP);
console.log("Server Runnning");

function doRequest(req,res){
  let number = Math.floor(Math.random() * 3);
  fs.readFile("./chapter2.html","UTF-8",function(err,data){

      const animals = ["dog","cat","pig","monkey"];
      data2 = data.replace(/@animal@/g,animals[number]);
      res.writeHead(200,{"Content-Type":"text/html"});
      res.write(data2)
      res.end();
    }
  );

}
