var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var Buyings = new Schema({
  item: {type: Number, required: [true, 'Why no item?']},
  buyingOrder: {type: Number, required: [true, 'Why no buyingOrder?']},
  quantity: {type: String, required: true},
  price: {type: Number, required: [true, 'Why no price?']},
  currency: {type: Number, required: [true, 'Why no currency?']},
  exchangeRate: {type: Number, required: [true, 'Why no exchangeRate?']},

  status: Boolean
});

Buyings.plugin(timestamps);
// BuyingOrder.index({ repName: 'text'});
exports.Buyings = mongoose.model('Buyings', Buyings);
