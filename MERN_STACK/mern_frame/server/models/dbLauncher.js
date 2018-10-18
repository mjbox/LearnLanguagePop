'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongodb_tutorial');
var db = mongoose.connection;
db.on('error', function(){
    console.log('Connection Failed!');
});
db.once('open', function() {
    console.log('Connected!' + db);
});

module.exports = db;