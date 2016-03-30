var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;

var order = new Schema({
   invoice: {type : mongoose.Schema.ObjectId, ref : 'Invoice'},
   product: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
   createDate: Date,
   type: {type: Number, required: [true, 'Why no type?']},
   notes: {type: String, required: true},
   piad: {type: Number, required: [true, 'Why no piad?']},
   left: {type: Number, required: [true, 'Why no left?']},
   quantity: {type: Number, required: [true, 'Why no piad?']},
   discount
   price: {type: Number, required: [true, 'Why no piad?']},
   macAddress
   startDate: Date,
   endDate: Date,
   siteId: {type: String, required: true},

   status: Boolean  
});

order.plugin(textSearch);
order.plugin(timestamps);
order.index({ customer: 'text'});
exports.order = mongoose.model('order', order);