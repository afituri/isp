var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var Package = new Schema({
  product:{type: Number, required: true},
  type:{type: Number, required: true},
  service:{type: Number, required: true},
  dSpeed:{type: Number, required: true},
  uSpeed:{type: Number, required: true},
  monthlyQuota:{type: Number, required: true},
  renewPrice:{type: Number, required: true},
  GBPrice: {type: Number, required: true},
  cost: Number,
  costCurrency:{type: Number, required: true},
  exchangeRate:{type: Number, required: true},

  status: Boolean
});

Package.plugin(timestamps);
// Package.index({ repName: 'text'});
module.exports = mongoose.model('Package', Package);
