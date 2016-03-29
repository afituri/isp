var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var BuyingOrder = new Schema({
  item: {type: Number, required: [true, 'Why no item?']},
  buyingOrder: {type: Number, required: [true, 'Why no buyingOrder?']},
  quantity: {type: String, required: true},
  price: {type: Number, required: [true, 'Why no price?']},
  currency: {type: Number, required: [true, 'Why no currency?']},
  exchangeRate: {type: Number, required: [true, 'Why no exchangeRate?']},

  status: Boolean
});

BuyingOrder.plugin(timestamps);
BuyingOrder.index({ repName: 'text'});
module.exports = mongoose.model('BuyingOrder', BuyingOrder);
