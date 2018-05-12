var express = require('express');
var router = express.Router();
var CustomerModel = require('./Model');
var bodyParser = require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended : true
}));

router.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

router.get('/' , function(req, res ){
    CustomerModel.find(null,null,null,function(err,docs){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        res.json(docs);
    })
    
})

router.get('/checkmail/:email',function(req,res){
    var email = req.params.email
    CustomerModel.find({email: email},null ,null ,function(err,docs){
        if(err){
            console.log(err)
            res.status(500).send()
        }
        if(docs.length != 0){
            res.send("ใช้งานแล้ว");
        }else{
            
            res.send("ใช้ได้");
        }
    })
})

router.get('/login/:email/:password',function(req,res){
    var email = req.params.email
    var password = req.params.password
    CustomerModel.find({email: email , password : password },null ,null ,function(err,docs){
        if(err){
            console.log(err)
        }
         res.json(docs);
    })

})

router.get('/register/:email/:password/:name/:tel',function(req,res){
    var email = req.params.email;
    var password = req.params.password;
    var name = req.params.name;
    var tel = req.params.tel;

    CustomerModel.find({email: email},null ,null ,function(err,docs){
        if(err){
            console.log(err)
            res.status(500).send()
        }
        if(docs.length != 0){
            res.json("no");
        }else{ 
            const newData = new CustomerModel({
                email : email,
                password : password,
                name : name,
                tel : tel
             })
             newData.save(err => {
                 if(err) {
                     console.error(err)
                 }
                 res.status(201).json(newData)
             })
        }
    })
})

module.exports = router;