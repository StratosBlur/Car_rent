var express = require('express');
var router = express.Router();
var CarsModel = require('./Model');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended : true
}));

router.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


router.get('/',function(req,res){
    
    CarsModel.find(null,null,null,function(err,docs){
        if(err){
            console.log(err);
            res.status(500).send()
        }
         res.json(docs);
    })
});

router.get('/find/:Seats/:Cost',function(req,res){
    var Seats = req.params.Seats
    var Cost = req.params.Cost
   console.log( "Find Car is "+ Cost +" ฿ and "+ Seats + " Seats")
   CarsModel.find({Seats : Seats , Cost : Cost},null,null,function(err,docs){
       if(err){
           console.log(err)
           res.status(500).send()
       }
       res.json(docs)
   })

});

router.post('/add',function(req,res){
    var car = req.body
    if( car.Car_id == '' || car.Car_name == '' ){
        res.status(400).send("error")
    }else{
        var data = new CarsModel({
            Car_id : req.body.Car_id,
            Car_name : req.body.Car_name,
            Seats : req.body.Seats,
            Doors : req.body.Doors,
            Gear : req.Gear,
            Cost : req.body.Cost,
            Img : req.body.Img
        });
        data.save(err => {
            if(err){
                console.error(err)
            }
             res.status(201).json(data)
        })
        
    }

});




module.exports = router;