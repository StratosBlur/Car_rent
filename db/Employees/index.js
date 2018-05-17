var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var EmployeesModel = require('./Model')

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

router.get('/remove/:email',(req,res) => {
    var email = req.params.email
    EmployeesModel.deleteMany({email : email},(err) => {
        if(err){
            return res.send(err)
        }
        res.send("delete " + emp_email)
    })
})






module.exports = router;