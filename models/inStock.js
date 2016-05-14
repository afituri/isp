var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Instock = new Schema({
   warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse'},
   product: { type: mongoose.Schema.ObjectId, ref : 'Product'},
   invoice: { type : mongoose.Schema.ObjectId, ref : 'Invoice',default:null},
   description: { type: String},
   macAddress: { type: String},
   username: { type: String},
   password: { type: String},
  
   status: { type: Number, default:1}
});

Instock.plugin(timestamps);
Instock.index({ Instock: 'text'});
exports.Instock = mongoose.model('Instock', Instock);