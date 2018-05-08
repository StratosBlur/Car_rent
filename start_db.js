var express = require('express');
var app = express();
var port = 1222;
var Cars = require('./db/Cars/');



app.use('/api/cars',Cars)

app.listen(port, function(){
    console.log('Start api server on ' + port);
})
