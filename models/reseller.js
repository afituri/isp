var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var Reseller = new Schema({
  repName:{type: String, required: true},
  companyName:{type: String, required: true},
  city: {type: Number, required: true},
  address:{type: String, required: true},
  langtitude:{type: String, required: true},
  longtitude:{type: String, required: true},
  email:{type: String, required: true},
  password: {type: String, required: true},
  salt: String,
  phone:{type: String, required: true},
  policy:{type: String, required: false},
  status: Boolean
});

Reseller.plugin(timestamps);
Reseller.index({ repName: 'text'});
module.exports = mongoose.model('Reseller', Reseller);
