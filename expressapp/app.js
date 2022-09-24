const express = require('express');
const ejs = require("ejs");
const app = express();

app.engine('ejs',ejs.renderFile);

app.get('/', function(req, res){
  res.render('test.ejs',{
    title:"タイトルです~expressを使用してます~",
    content:"コンテンツが入ります"
  });
})

const server = app.listen(3000, function(){
  console.log('Server is running!');
})
