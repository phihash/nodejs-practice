const fs = require("fs");
const http = require("http");
const ejs = require("ejs");
const url = require("url");
const qs =require("querystring");

const template =  fs.readFileSync("./chapter3.ejs","utf8");
const page1 = fs.readFileSync("page1.ejs","utf8");
const page2 = fs.readFileSync("page2.ejs","utf8");

const routers = {
  "/":{
    "message":"page1を表示します",
    "content":page1
  },
  "/other":{
    "message":"page2を表示する",
    "content":page2
  },

}
const server = http.createServer();

server.on("request",doRequest);
server.listen(1234);
console.log("Server Running")

function doRequest(req,res){
  const url_parts = url.parse(req.url);

  if (routers[url_parts.pathname] == null){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("<html><body><h1>NOT FOUND PAGE:" +
        req.url + "</h1></body></html>");
    return;
}

const site = {
    content:ejs.render(routers[url_parts.pathname].content,{
      message:routers[url_parts.pathname].message
    })
}
const site2 = ejs.render(template,site);
res.writeHead(200,{"Content-Type" :" text/html"});
res.write(site2);
res.end();
}
