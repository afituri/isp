var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;
// set up a mongoose model

var Customer = new Schema({
   name: {type: String, required: true},
   repName: {type: String},
   city: {type: String, required: [true, 'Why no type?']},
   address: {type: String, required: true},
   email: {type: String, required: true},
   phone: {type: String, required: true},
   type: {type: Number, required: [true, 'Why no type?']},
   // reseller: {type: Number, required: [true, 'Why no type?']},
   notes: {type: String, required: true},
   // policy: {type: Number, required: [true, 'Why no type?']},
   
   status: Boolean  
});

Customer.plugin(textSearch);
Customer.plugin(timestamps);
Customer.index({ customer: 'text'});
exports.Customer = mongoose.model('Customer', Customer);