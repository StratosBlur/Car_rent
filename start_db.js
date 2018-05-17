var express = require('express');
var app = express();
var port = 1222;
var Cars = require('./db/Cars/');
var Customers = require('./db/Customers/')
var Book = require('././db/Booking/index')
var Employee = require('./db/Employees/')

app.use('/api/cars',Cars)
app.use('/api/cus',Customers)
app.use('/api/book',Book)
app.use('/api/emp',Employee)

app.listen(port, function(){
    console.log('Start api server on ' + port);
})
