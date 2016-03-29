var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var Reseller = new Schema({
  product:{type: String, required: true},
  supplier:{type: String, required: true},
  made:{type: Number, required: true},
  brand:{type: String, required: true},
  
  status: Boolean
});

Reseller.plugin(timestamps);
Reseller.index({ repName: 'text'});
module.exports = mongoose.model('Reseller', Reseller);
