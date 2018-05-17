var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/:27017/Car_rent');
var db = mongoose.connection;
var ObjectId = mongoose.Schema.ObjectId;
var BookingSchema = mongoose.Schema({
    Car_id : {type : String},
    Cost : {type :String},
    email : {type:String},
    paid : {type :Boolean},
    stat : {type :String}

}, {_id : true , timestamps: false});

module.exports = mongoose.model('BookingModel',BookingSchema,'Booking')


