const ejs = require("ejs");
const http = require("http");
const fs = require("fs");
const server = http.createServer();
const hello = fs.readFileSync("./hello.ejs","utf-8");
const content1 = fs.readFileSync("./content1.ejs","utf-8");

server.on("request",doRequest);
server.listen(1234);
// server.listen(process.env.PORT, process.env.IP);
console.log("Server Runnning");

function doRequest(req,res){
  const hello2  = ejs.render(hello,{
    title:"タイトル",
    content:ejs.render(content1,{
      data:[
        "これは最初のデータです。","2番目のデータです","最後のデータです"
      ],
      message:"コンテンツ1に渡したいメッセージです"
    }),
  })
  res.writeHead(200,{'Content-Type': 'text/html'});
  res.write(hello2);
  res.end();
}
