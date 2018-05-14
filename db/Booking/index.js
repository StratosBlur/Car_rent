var express = require('express');
var router = express.Router();
var CarsModel = require('../Cars/Model');
var CustomerModel = require('../Customers/Model')
var bodyParser = require('body-parser');

function getTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    return dd+mm+yyyy;
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

//ปรับสถานะรถ และเพิ่มรายการจอง
router.post('/booking', function(req,res) {
    //ปรับสถานะรถ
    const email = req.body.email
    const Car_id = req.body.Car_id
    const Cost = req.body.Cost
    CarsModel.findOneAndUpdate({Car_id : Car_id }, {status : "Booking" }, {upsert:true}, function(err, doc){
        if (err){ 
            return res.send(500, { error: err })
        }else{
            console.log("this " + Car_id + " is Booking")
        }
    });

    CustomerModel.findOne({email : email} , function (err , doc) {
        if(err){
            return res.send(500,{error : err})
        }else{
            doc.Car.Car_id = Car_id
            doc.Car.Book_Cost = Cost
            doc.Car.Book_createDate = getTodayDate()
            doc.Car.Book_remainingDay = "3"
            doc.save()
            console.log("Booking " + doc.Car.Car_id + " to "+ email + " Successful")
            return res.send("succesfully saved")
        }
        
    })
   
   
    
})
//ทำการเช่า 
router.post('/renting' , function (req,res) {
    const email  = req.body.email
    const s_id = req.body.s_id
    const Rent_Start_Date = req.body.startdate
    const Rent_Return_Date = req.body.enddate
    
    CustomerModel.findOne({email : email} , function (err , doc) {
        if(err){
            return res.send('500',{error : err})
        }else{
            doc.Car.s_id = s_id
            doc.Car.Rent_Start_Date = Rent_Start_Date
            doc.Car.Rent_Return_Date = Rent_Return_Date
            doc.save()
            console.log("Rented " + doc.Car.Car_id + " to "+ email + " Successful")
            CarsModel.findOne({Car_id : doc.Car.Car_id }, function (err,doc) {
                if(err){
                    return res.send('500',{error : err});
                }
                doc.status = "Rented"
                doc.save()
            })
            return res.send("save Successful")
        }
    })
})


router.post('/return', (req, res) => {
    const email  = req.body.email
    CustomerModel.findOne({email : email },(err,doc) => {
        if(err){
            return res.send('500',{error : err});
        }
        const Car_id = doc.Car.Car_id
        doc.Car = {}
        doc.save()
        console.log("remove car from " + email)
        CarsModel.findOne({Car_id : Car_id},(err,doc) => {
            if(err){
                return res.send('500',{error:err})
            }
            doc.status = ""
            doc.save()
            console.log("return car "+ Car_id +" from " + email)
        })


    })

});




module.exports = router;