var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;
// set up a mongoose model

var order = new Schema({
  customer: {type: String, index: true, default: "Unknown order"},
  createDate: Date,
  type: {type: Number, required: [true, 'Why no type?']},
  notes: {type: String, required: true},
  piad: {type: Number, required: [true, 'Why no piad?']},
  left: {type: Number, required: [true, 'Why no left?']},

  // invoice
  // product
  // quantity
  // discount
  // price
  // macAddress
  // startDate
  // endDate
  siteld: {type: String, required: true},


  status: Boolean  
});

order.plugin(textSearch);
order.plugin(timestamps);
order.index({ customer: 'text'});
module.exports = mongoose.model('order', order);