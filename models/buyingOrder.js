var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var BuyingOrder = new Schema({
  createDate: { type: Date, default: Date.now },
  supplier:{type: Number, required: [true, 'Why no supplier?']},
  notes:{type: String, required: true},
  paid:{type: Number, required: [true, 'Why no paid?']},
  left:{type: Number, required: [true, 'Why no left?']},
  
  status: Boolean
});

BuyingOrder.plugin(timestamps);
module.exports = mongoose.model('BuyingOrder', BuyingOrder);
