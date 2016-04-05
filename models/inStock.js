var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var inStock = new Schema({
   warehouse: {type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse'},
   buyingOrder: {type: mongoose.Schema.Types.ObjectId, ref: 'BuyingOrder'},
   product: {type : mongoose.Schema.ObjectId, ref : 'Product'},
   description: {type: String},
   macAddress: {type: String},
  
   status: {type: Number, default:1}
});

inStock.plugin(timestamps);
inStock.index({ inStock: 'text'});
exports.inStock = mongoose.model('inStock', inStock);