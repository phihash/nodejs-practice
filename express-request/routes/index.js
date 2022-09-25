var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next) {
  var p1 = req.query.p1;
  var p2 = req.query.p2;
  var msg = p1 == undefined ? "空です" : p1 + "," + p2;
  res.render('hello',
      {
          title: 'HELLO Page',
          msg: msg
      }
  );
});

router.post("/hello",function(req,res){
  let str = req.body["input1"];
  let comment = req.body["comment"];
  res.render('hello',
        {
            title: 'HELLO Page',
            msg:  str + "さん",
            comment:comment,
            input: str
        }
    );
})

module.exports = router;
