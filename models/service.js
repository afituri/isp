var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var Reseller = new Schema({
  name:{type: String, required: true},
  servicesProvider:{type: String, required: true},
  discriptoin:{type: String, required: true},
  
  status: Boolean
});

Reseller.plugin(timestamps);
Reseller.index({ repName: 'text'});
module.exports = mongoose.model('Reseller', Reseller);
