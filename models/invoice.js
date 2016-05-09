var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;

var Invoice = new Schema({
   customer: { type: mongoose.Schema.ObjectId, ref : 'Customer'},
   /*createDate: { type: Date, default: Date.now },*/
   type: { type: Number, required: [true, 'Why no type?']},
   notes: { type: String, required: true},
   piad: { type: Number, required: [true, 'Why no piad?']},
   /*left: { type: Number},*/
   discount: { type: Number, required: [true, 'Why no piad?']},
   status: { type: Number, default:1}
});

Invoice.plugin(textSearch);
Invoice.plugin(timestamps);
Invoice.index({ customer: 'text'});
exports.Invoice = mongoose.model('Invoice', Invoice);