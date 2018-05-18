var express = require('express');
var router = express.Router();
var CarsModel = require('../Cars/Model');
var CustomerModel = require('../Customers/Model');
var BookingModel = require('../Booking/model');
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
    extended : false
}));

router.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//ปรับสถานะรถ และเพิ่มรายการจอง
router.post('/booking', function(req,res) {
    const email = req.body.email
    const Car_id = req.body.Car_id
    const Cost = req.body.Cost
    const startdate = req.body.startdate
    const enddate = req.body.enddate



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
            doc.Car.Rent_Start_Date = startdate
            doc.Car.Rent_Return_Date = enddate
            doc.save()
            console.log("Booking " + doc.Car.Car_id + " to "+ email + " Successful")
           
        }
        
    })
   
    var book = new BookingModel ({
        email : email,
        Car_id : Car_id,
        Cost : Cost,
        stat : "Booking",
        paid : false
    })
    book.save(err => {
        if(err){
            console.error(err)
        }
        return res.send("succesfully saved")
    })
    
   
    
})
//ทำการเช่า 
router.post('/renting' , function (req,res) {
    const email  = req.body.email
    
    
    CustomerModel.findOne({email : email} , function (err , doc) {
        if(err){
            return res.send('500',{error : err})
        }else{
            console.log("Rented " + doc.Car.Car_id + " to "+ email + " Successful")
            CarsModel.findOne({Car_id : doc.Car.Car_id }, function (err,doc) {
                if(err){
                    return res.send('500',{error : err});
                }
                doc.status = "Rented"
                doc.save()
                BookingModel.findOne({email : email}, function (err,doc) {
                    if(err){
                        return res.send('500',{error : err});
                    }
                    doc.paid = true
                    doc.stat = "Rented"
                    doc.save()
                })
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
        doc.Car = {
            Car_id : "",
            Book_createDate :"",
            Book_remainingDay : "",
            Book_Cost : "",
            Rent_Start_Date : "",
            Rent_Return_Date : "",
            s_id : ""
        }
        doc.save()
        console.log("remove car from " + email)
        
            CarsModel.findOne({Car_id : Car_id},(err,doc) => {
                if(err){
                    return res.send('500',{error:err})
                }
                doc.status = "-"
                doc.save()
                console.log("return car "+ Car_id +" from " + email)
            })
 
        
        

        BookingModel.deleteMany({email: email},function (err) {
            if(err){
                return res.send('500',{error : err});
            }
            console.log("Delete Booking")
        })


    })

});

//โชว์ข้อมูลหน้า manage book
router.get('/getbook/:email', (req, res) => {
    const email = req.params.email
    CustomerModel.find({email : email},(err,doc) =>{
        if(err){
            return res.send('500',{error : err})
        }
        res.json(doc)
    })

});

router.get('/getbooklist/:email', (req, res) => {
    const email = req.params.email
    BookingModel.find({email : email},(err,doc) =>{
        if(err){
            return res.send('500',{error : err})
        }
        res.json(doc)
    })

});

router.get('/', (req,res) => {
    BookingModel.find(null,(err,doc) => {
        if(err){
            return res.send('500',{error : err})
        }
        res.json(doc);
    })
})









module.exports = router;