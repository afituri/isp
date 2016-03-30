var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var inStock = new Schema({
  // id warehouse  Warehouse
  // id buyingOrder: {type: String, required: true},
  item: {type: Number, required: [true, 'Why no city?']},
  description: {type: String},
  MACaddress: {type: String},
  
  status: Boolean
});

inStock.plugin(timestamps);
inStock.index({ inStock: 'text'});
exports.inStock = mongoose.model('inStock', inStock);