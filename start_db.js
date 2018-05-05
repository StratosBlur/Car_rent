var express = require('express');
var path = require('path');
var app = express();
var port = 1222;

var Cars = require('./db/Cars/');



app.use('/api/cars',Cars)

app.listen(port, function(){
    console.log('Database Managment Running on ' + port);
})
