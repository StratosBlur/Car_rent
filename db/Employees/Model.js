var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Car_rent')
var db = mongoose.connection
var objectId = mongoose.Schema.objectId
var EmployeesSchema = mongoose.Schema({
    "sid" : {Type : String}, 
    "email" : {Type : String}, 
    "password" : {Type : String}, 
    "idcard" : {Type : String}, 
    "level" : {Type : String}
},{_id : true , time : false})

module.exports = mongoose.model('EmployeesModel',EmployeesSchema,'Employees')
