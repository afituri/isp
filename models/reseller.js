var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var Reseller = new Schema({
  password: {type: String, required: true},
  salt: String,
  email: {type: String, unique : true, required : true},
  status: Boolean  
});

Reseller.plugin(timestamps);
Reseller.index({ name: 'text'});
module.exports = mongoose.model('Reseller', Reseller);