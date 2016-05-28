var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;

var Customer = new Schema({
   name: { type: String, required: true},
   repName: { type: String},
   city: { type: String, required: [true, 'Why no type?']},
   address: { type: String, required: true},
   email: { type: String, required: true},
   phone: { type: String, required: true},
   type: { type: Number, required: [true, 'Why no type?']},
   reseller: { type: Schema.Types.ObjectId , ref: 'Reseller',default:null},
   notes: { type: String, required: true},
   policy: { type: Schema.Types.ObjectId , ref: 'Policy'},
   status: { type: Number, default:1}
});

Customer.plugin(textSearch);
Customer.plugin(timestamps);
Customer.index({ name: 'text'});
exports.Customer = mongoose.model('Customer', Customer);