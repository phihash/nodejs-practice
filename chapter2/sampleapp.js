const fs = require("fs");
const http = require("http");
const server = http.createServer();



server.on("request",doRequest);
server.listen(1234);
// server.listen(process.env.PORT, process.env.IP);
console.log("Server Runnning");

function doRequest(req,res){
  fs.readFile("./hello.html",'UTF-8',function(err,data){
    const number = Math.floor(Math.random() * 3);
    const who = ["私は","俺は","あなたは"];
    const content = ["嬉しい","悲しい","眠たい"];
    const replaceData = data
    .replace(/@who@/g,who[number]).replace(/@content@/g,content[number]);
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write(replaceData);
    res.end();
  })
}
