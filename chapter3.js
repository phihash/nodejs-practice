const ejs = require("ejs");
const http = require("http");
const fs = require("fs");

const template =  fs.readFileSync("./chapter3.ejs","utf8");
const content1 = fs.readFileSync("./content.ejs","utf8");

const server = http.createServer();
server.on("request",doRequest);
server.listen(1234);
// server.listen(process.env.PORT, process.env.IP);
console.log("Server Runnning");


function doRequest(req,res){
  const content2 = ejs.render(content1,{
    message:"メッセージが入ります"
  })

  const template2 = ejs.render(template,{
    title : "タイトルです",
    content:content2
  })
  res.writeHead(200,{"Content-Type":"text/html"});
  res.write(template2)
  res.end();
}
