var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Instock = new Schema({
   warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse',required:true},
   product: { type: mongoose.Schema.ObjectId, ref : 'Product',required:true},
   invoice: { type : mongoose.Schema.ObjectId, ref : 'Invoice',default:null},
   description: { type: String},
   quantity: { type: Number},
   macAddress: { type: String, required:true},
   username: { type: String, required:true},
   password: { type: String ,required:true},
   status: { type: Number, default:1}
});

Instock.plugin(timestamps);
Instock.index({ Instock: 'text'});
exports.Instock = mongoose.model('Instock', Instock);