//models/Expense.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var expenseSchema = new Schema({
  name: String,
  author: String
});
module.exports = mongoose.model('Expense', expenseSchema);