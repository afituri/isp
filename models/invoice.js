var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;
// set up a mongoose model

var invoice = new Schema({
  customer: {type: String, index: true, default: "Unknown invoice"},
  createDate: Date,
  type: {type: Number, required: [true, 'Why no type?']},
  notes: {type: String, required: true},
  piad: {type: Number, required: [true, 'Why no piad?']},
  left: {type: Number, required: [true, 'Why no left?']},

  status: Boolean  
});

invoice.plugin(textSearch);
invoice.plugin(timestamps);
invoice.index({ customer: 'text'});
module.exports = mongoose.model('invoice', invoice);