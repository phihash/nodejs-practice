const ejs = require("ejs");
const http = require("http");
const url = require("url");
const fs = require("fs");
const qs = require('querystring');
const { post } = require("../exapp/routes");

const template = fs.readFileSync('./template.ejs', 'utf8');
const content1 = fs.readFileSync('./content1.ejs', 'utf8');
const content2 = fs.readFileSync('./content2.ejs', 'utf8');
const content3 = fs.readFileSync('./content3.ejs', 'utf8');
const form = fs.readFileSync('./form.ejs', 'utf8');

var routes = {
  "/":{
      "title":"Main Page",
      "message":"これはサンプルのページですよ。",
      "content":content1},
  "/other":{
      "title":"Other Page",
      "message":"別のページを表示していますよ。",
      "content":content2},
  "/form":{
    "title":"Other Page",
    "message":"別のページを表示していますよ。",
    "content":form},
  "/result":{
    "title":"Other Page",
    "message":"別のページを表示していますよ。",
    "content":content3},
};

const server = http.createServer();

server.on("request",doRequest);
server.listen(1234);
// server.listen(process.env.PORT, process.env.IP);
console.log("Server Runnning");

function doRequest(req,res){

  const url_parts = url.parse(req.url);

  //存在しないルート
  if(routes[url_parts.pathname] == null){
    console.log("NOT FOUND PAGE:" + req.url);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("<html><body><h1>NOT FOUND PAGE:" +
    req.url + "</h1></body></html>");
    return;
  }

  //GETメソッドでアクセスされた
  if(req.method == "GET"){
    const content = ejs.render( template,
      {
          title: routes[url_parts.pathname].title,
          content: ejs.render(
              routes[url_parts.pathname].content,
              {
                  message: routes[url_parts.pathname].message
              }
          )
      }
    );
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write(content);
    res.end();
  }

  //POSTメソッドでアクセスされた
  if(req.method == "POST"){
    if(url_parts.pathname == "/result" ){
      let body = "";
      req.on("data",function(data){
        body += data;
      });
      req.on("end",function(){
        const post  = qs.parse(body);
        const content = ejs.render(template,{
          title:routes[url_parts.pathname].title,
          content:ejs.render(routes[url_parts.pathname].content,{
            idname:post.idname,
            pass:post.pass
          })
        })
        res.writeHead(200,{'Content-Type': 'text/html'});
      res.write(content);
      res.end();
      });

    }else{
      res.writeHead(200,{'Content-Type': 'text/plain'});
      res.write("No-POST");
      res.end();
    }

  }


}
