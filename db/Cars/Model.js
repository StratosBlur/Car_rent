var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Car_rent')
var db = mongoose.connection;
var ObjectId = mongoose.Schema.ObjectId;
var CarSchema = mongoose.Schema({
    Car_id: {type : String},
    Car_name:{type :String},
    Seats : {type :String},
    Doors: {type :String},
    Gear: {type :String},
    Cost:{type :String},
    Img: {
        pic_one : {type :String},
        pic_two : {type :String},
        pic_three : {type :String}
    }
}, {_id : true, timestamps : false});

module.exports = mongoose.model('CarsModel',CarSchema,'Cars');