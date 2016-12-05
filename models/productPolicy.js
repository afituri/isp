var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Productpolicy = new Schema({
   product: { type: Schema.Types.ObjectId , ref: 'Product'},
   policy: { type: Schema.Types.ObjectId , ref: 'Policy'},
   type: { type: String, enum: ['service', 'item', 'package','etc'], required: true},
   initialPrice: { type: Number, required: true},
   item: {
      // supplier:{type: String, required: true},
      made: { type: Number},
      brand: { type: String}
   },
   packages: {
      renewPrice: { type: Number}
  
   },
   status: { type: Number, default:1}
});

Productpolicy.plugin(timestamps);
Productpolicy.index({ name: 'text'});
exports.Productpolicy = mongoose.model('Productpolicy', Productpolicy);