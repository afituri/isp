var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Policy = new Schema({
   name: { type: String, required: true},
   type: { type: String, enum: ['service', 'item', 'package'], required: true},
   discriptoin: { type: String, required: true},
   initialPrice: { type: Number, required: true},
   item: {
      // supplier:{type: String, required: true},
      made:{type: Number},
      brand:{type: String}
   },
   packages: {
      renewPrice: { type: Number},
      GBPrice: { type: Number},
   },
   status: Boolean
});

Policy.plugin(timestamps);
Policy.index({ name: 'text'});
exports.Policy = mongoose.model('Policy', Policy);