var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Product = new Schema({
   name: { type: String, required: true},
   type: { type: String, enum: ['product1', 'product2', 'product3'], required: true},
   discriptoin: { type: String, required: true},
   initialPrice: { type: Number, required: true},
   item: {
      // supplier:{type: String, required: true},
      made:{type: Number, required: true},
      brand:{type: String, required: true}
   },
   packages: {
      type: { type: Number, required: true},
      service: { type: Number, required: true},
      dSpeed: { type: Number, required: true},
      uSpeed: { type: Number, required: true},
      monthlyQuota: { type: Number, required: true},
      renewPrice: { type: Number, required: true},
      GBPrice: { type: Number, required: true},
      cost: Number,
      costCurrency: { type: Number, required: true},
      exchangeRate: { type: Number, required: true}
   },
   status: Boolean
});

Product.plugin(timestamps);
Product.index({ name: 'text'});
module.exports = mongoose.model('Product', Product);
