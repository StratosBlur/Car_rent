var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Car_rent')
var db = mongoose.connection
var objectId = mongoose.Schema.objectId
var CustomerSchema = mongoose.Schema({
    email : {type :String},
    password : {type :String},
    name:{type: String},
    tel:{type: String},
    Car:{
        Car_id : {type: String},
        Book_createDate :{type: String},
        Book_remainingDay : {type: String},
        Book_Cost : {type: String},
        Rent_Start_Date : {type: String},
        Rent_Return_Date : {type: String},
        s_id : {type: String},
    }
},{_id : true , time : false})

module.exports = mongoose.model('CustomerModel',CustomerSchema,'Customers')
