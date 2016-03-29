var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var Item = new Schema({
  product:{type: String, required: true},
  supplier:{type: String, required: true},
  made:{type: Number, required: true},
  brand:{type: String, required: true},
  
  status: Boolean
});

Item.plugin(timestamps);
// Reseller.index({ repName: 'text'});
exports.Item = mongoose.model('Item', Item);
