//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('.././models/Expense');

router.get('/', function(req, res){
  res.render('index')
});

router.route('/insert')
.post(function(req,res) {
  console.log(req.body.desc + " test");
  res.send('Expense successfully added!');
  /*
  var expense = new Expense();
  expense.description = req.body.desc;
  expense.amount = req.body.amount;
  expense.month = req.body.month;
  expense.year = req.body.year;
  expense.save(function(err) {
      if (err)
        res.send(err);
      res.send('Expense successfully added!');
  });
  */
})

module.exports = router;