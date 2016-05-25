var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var Invoice = new Schema({
   customer: { type: mongoose.Schema.ObjectId, ref : 'Customer'},
   /*createDate: { type: Date, default: Date.now },*/
   type: { type: Number, required: [true, 'Why no type?']},
   notes: { type: String, required: true},
   piad: { type: Number, required: [true, 'Why no piad?']},
   reseller: { type: Schema.Types.ObjectId , ref: 'Reseller'},
   /*left: { type: Number},*/
   discount: { type: Number, required: [true, 'Why no piad?']},
   idinv:{ type: Number},
   status: { type: Number, default:1}
});
Invoice.plugin(autoIncrement.plugin, {
    model: 'Invoice',
    field: 'idinv'
});
Invoice.plugin(textSearch);
Invoice.plugin(timestamps);
Invoice.index({ customer: 'text'});
exports.Invoice = mongoose.model('Invoice', Invoice);