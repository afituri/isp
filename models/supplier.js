var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var Reseller = new Schema({
  name:{type: String, required: true},
  email:{type: String, required: true},
  phone:{type: String, required: true},
  repName:{type: String, required: true},
  repPhone:{type: String, required: true},
  notes:{type: String, required: true},

  status: Boolean
});

Reseller.plugin(timestamps);
Reseller.index({ repName: 'text'});
module.exports = mongoose.model('Reseller', Reseller);
