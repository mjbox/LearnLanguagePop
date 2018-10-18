//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('../models/Expense');
var dbLauncher = require('../models/dbLauncher');

router.get('/', function(req, res){
  res.render('index')
});

router.route('/insert')
.post(function(req,res) {
  console.log(req.body.name + " test");
  var myobj = { name: req.body.name, author: req.body.author };
  dbLauncher.collection("books").insertOne(myobj, function(err, ires) {
    var result = "Expense successfully added!";
      if (err){
        result = err;
        res.send(err);
      }
      console.log(result);
      res.send(result);
  });
})
router.route('/read')
.post(function(req,res) {
  var result = "";
  dbLauncher.collection('books').find().stream()
    .on('data', function(doc){
      result = result.concat(doc.name);
      console.log(doc.name);
    })
    .on('error', function(err){
      // handle error
    })
    .on('end', function(){
      // final callback
      console.log("async end");
      res.send("Expense successfully showed! : " + result);
    });
  console.log("sync end");
})
module.exports = router;