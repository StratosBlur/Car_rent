var path = require('path');
var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/',['Cars']);



router.get('/api/cars',function(req,res,next){
    db.Cars.find(function(err,data){
        if(err){
            res.send(err);
        }else{
            res.json(data);
        }
    });
});

module.exports = router;