var express = require('express');
var app = express();
var port = 1222;
var Cars = require('./db/Cars/');
var Customers = require('./db/Customers/')


app.use('/api/cars',Cars)
app.use('/api/cus',Customers)

app.listen(port, function(){
    console.log('Start api server on ' + port);
})
