//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('../models/Expense');
var dbProcess = require('../models/dbProcess');

router.get('/', function(req, res){
  res.render('index')
});
router.route('/getdb')
.post(function(req,res) {
  dbProcess.get(req, res);
})
module.exports = router;