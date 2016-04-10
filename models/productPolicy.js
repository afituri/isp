var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var ProductPolicy = new Schema({
   product: { type: Schema.Types.ObjectId , ref: 'Product'},
   policy: { type: Schema.Types.ObjectId , ref: 'Policy'},
   type: { type: String, enum: ['service', 'item', 'package'], required: true},
   initialPrice: { type: Number, required: true},
   item: {
      // supplier:{type: String, required: true},
      made: { type: Number},
      brand: { type: String}
   },
   packages: {
      renewPrice: { type: Number},
      GBPrice: { type: Number},
   },
   status: { type: Number, default:1}
});

ProductPolicy.plugin(timestamps);
ProductPolicy.index({ name: 'text'});
exports.ProductPolicy = mongoose.model('ProductPolicy', ProductPolicy);