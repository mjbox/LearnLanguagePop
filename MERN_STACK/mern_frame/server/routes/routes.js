//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('../models/Expense');
var dbProcess = require('../models/dbProcess');

router.get('/', function(req, res){
  res.render('index')
});
/*
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
*/
router.route('/getdb')
.post(function(req,res) {
  dbProcess.get(req, res);
})
module.exports = router;