var express = require('express');

var router = express.Router();
var CarsModel = require('./Model');
var bodyParser = require('body-parser');
var mongojs = require('mongojs')
var db = mongojs('Car_rent',['Cars'])

function car(Car_name,Seats,Doors,Gear,Cost,pic_one,pic_two,pic_three){
           this.Car_id     = "C"+Math.floor((Math.random() * 100) + 1) 
           this.Car_name   = Car_name 
           this.Seats      = Seats 
           this.Doors      = Doors
           this.Gear       = Gear
           this.Cost       = Cost 
           this.Img = { 
                    pic_one : pic_one,
                    pic_two : pic_two,
                    pic_three : pic_three
            }
            this.status = "-"
}

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended : true
}));

router.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//หารถที่ยังไม่เช่า
router.get('/',function(req,res){
    
    CarsModel.find({"status" : "-"},null,null,function(err,docs){
        if(err){
            console.log(err);
            res.status(500).send()
        }
         res.json(docs);
    })
});

router.get('/findbyId/:id',function(req,res){
    CarsModel.find({Car_id : req.params.id},null,null,function(err,docs){
        if(err){
            console.log(err)
            res.status(500).send()
        }
        res.json(docs)
    })
})



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
    var Car_name   = req.body.Car_name
    var Seats      = req.body.Seats
    var Doors      = req.body.Doors
    var Gear       = req.body.Gear
    var Cost       = req.body.Cost
    var pic_one    = req.body.pic_one
    var pic_two    = req.body.pic_two
    var pic_three  = req.body.pic_three

    var newcar = new car(Car_name,Seats,Doors,Gear,Cost,pic_one,pic_two,pic_three)
    db.Cars.save(newcar,(err,doc) => {
        if(err){
            return res.send(err);
        }
        res.send("add car complete");
    })
});




module.exports = router;