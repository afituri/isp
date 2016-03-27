var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var Reseller = new Schema({
  repName: {type: String, index: true},
  companyName: String,
  city: Number,
  address: String,
  langtitude: String,
  longtitude: String,
  email: {type: String, unique : true, required : true},
  password: {type: String, required: true},
  salt: String,
  status: Boolean,
  phone: String,
  policy: {type:Number, default:1}

});

Reseller.plugin(timestamps); 
Reseller.index({ companyName: 'text'});
module.exports = mongoose.model('Reseller', Reseller);