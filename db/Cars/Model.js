var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Car_rent')
var db = mongoose.connection;
var ObjectId = mongoose.Schema.ObjectId;
var CarSchema = mongoose.Schema({
    Car_id: Number,
    Car_name:String,
    Car_spec : {
        Seats : Number,
        Doors: Number,
        Gear: String
    },
    Cost:Number
}, {_id : true, timestamps : false});

module.exports = mongoose.model('CarsModel',CarSchema,'Cars');