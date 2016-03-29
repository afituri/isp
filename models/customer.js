var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;
// set up a mongoose model

var Customer = new Schema({
  name: {type: String, index: true, default: "Unknown Customer"},
  birthdate: [Date],
  email: {type: String, unique : true, required : true},
  phone: {type: String, default:"NULL"},
  nid: {type: Number, required: [true, 'Why no nid?']},
  companyName: {type: String, required: true},
  city: {type: Number, required: [true, 'Why no city?']},
  address: {type: String, required: true},
  type: {type: Number, required: [true, 'Why no type?']},
  reseller: {type: Number, required: [true, 'Why no reseller?']},
  notes: {type: String, required: true},
  policy: {type: Number, required: [true, 'Why no policy?']},

  status: Boolean  
});

Customer.plugin(textSearch);
Customer.plugin(timestamps);
Customer.index({ name: 'text'});
module.exports = mongoose.model('Customer', Customer);