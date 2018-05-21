var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongojs = require('mongojs')
var db = mongojs('Car_rent',['Reviews'])

function Reviews(name,comment){
    this.Name   = name
    this.Comment  = comment    
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

router.get('/',function(req,res){
    db.Reviews.find((err,doc)=>{
         if(err){
             return res.send(err)
         }
        res.json(doc);
    })
    
});

router.get('/comment/:name/:comment',function (req,res) {
    var name = req.params.name
    var comment = req.params.comment
    
    var newdata = new Reviews(name,comment)
    db.Reviews.save(newdata,(err,doc)=> {
        if(err){
            return res.send(err)
        }
        return res.send('comment finish')
    })

    
})

module.exports = router;