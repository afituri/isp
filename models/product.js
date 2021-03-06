var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Product = new Schema({
   // service 
   // add service only
   //package 
   // add packege only 
   //service 
   // name , type , description ,initialprice
   name: { type: String, required: true},
   type: { type: String, enum: ['service', 'item', 'package','etc'], required: true},
   discriptoin: { type: String},
   initialPrice: { type: Number, required: true},
   item: {
      supplier: { type: Schema.Types.ObjectId , ref: 'Supplier'},
      /*made: { type: Number},*/
      brand: { type: String}
   },
   packages: {
      type:{ type: Schema.Types.ObjectId , ref: 'Serviceprovider'},
      service: { type: Schema.Types.ObjectId , ref: 'Service'},
      dSpeed: { type: String},
      uSpeed: { type: String},
      monthlyQuota: { type: String},
      renewPrice: { type: String},
      GBPrice: { type: String},
      cost: Number,
      costCurrency: { type: String},
      exchangeRate: { type: Number},
      shear: {type: String}
   },
   status: { type: Number, default:1}
});

Product.plugin(timestamps);
Product.index({ name: 'text'});
exports.Product = mongoose.model('Product', Product);