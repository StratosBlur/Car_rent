var express = require('express');
var app = express();
var port = 1222;
var Cars = require('./db/Cars/');
var Customers = require('./db/Customers/')
var Book = require('././db/Booking/index')
var Employee = require('./db/Employees/')
var Reviews = require('./db/Reviews/index')
var Account = require('./db/Employees/Account')

app.use('/api/cars',Cars)
app.use('/api/cus',Customers)
app.use('/api/book',Book)
app.use('/api/emp',Employee)
app.use('/api/reviews',Reviews)
app.use('/api/account',Account)

app.listen(port, function(){
    console.log('Start api server on ' + port);
})
