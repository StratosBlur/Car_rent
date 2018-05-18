var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var EmployeesModel = require('./Model')

var mongojs = require('mongojs')
var db = mongojs('Car_rent',['Employees'])

function emp(email,password , idcard){
    this.email = email
    this.password = password
    this.idcard = email
    this.sid = "S"+Math.floor((Math.random() * 100) + 1)
    this.level = '1'
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

router.get('/',function (req,res) {
    EmployeesModel.find(null,null,null,function(err,docs){
        if(err){
            console.log(err)
            res.send.status(500).send()
        }
        res.send(docs);
    })
    
})

router.get('/find/:email',function (req,res) {
    EmployeesModel.find({email : req.params.email},null,null,function(err,docs){
        if(err){
            console.log(err)
            res.send.status(500).send()
        }
        res.send(docs);
    })
    
})

router.get('/login/:email/:pass',function(req,res){
    var email =  req.params.email;
    var password = req.params.pass
    EmployeesModel.find({email : email , password : password},null,null,function (err,doc) {
        if(err){
            console.log(err)
        }
         res.json(doc);
    })
})

router.get('/edit/:email/:password/:idcard',(req,res)=>{
    var email  = req.params.email
    var password = req.params.password
    var idcard = req.params.idcard
    console.log("edited for "+email)
    EmployeesModel.update({email : email},{
        email : email,
        password : password,
        idcard: idcard
    },(err,doc)=> {
        if(err){
            return res.send(err)
        }
        res.send("update complete")
    })
   
})

router.get('/remove/:email',(req,res) => {
    var email = req.params.email
    EmployeesModel.deleteMany({email : email},(err) => {
        if(err){
            return res.send(err)
        }
        res.send("delete " + emp_email)
    })
})

router.get('/register/:email/:password/:idcard',function(req,res){
    var email = req.params.email;
    var password = req.params.password;
    var idcard = req.params.idcard

    var newdata = new emp(email,password,idcard)
    db.Employees.save(newdata,(err,doc) =>{
        if(err){
            return res.send(err)
        }
        return res.send("add complete");
    })
    
})




module.exports = router;