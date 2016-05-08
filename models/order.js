var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;

var Order = new Schema({
   invoice: { type : mongoose.Schema.ObjectId, ref : 'Invoice'},
   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
   /*type: { type: Number, required: [true, 'Why no type?']},
   notes: { type: String, required: true},
   piad: { type: Number, required: [true, 'Why no piad?']},
   left: { type: Number, required: [true, 'Why no left?']},*/
   /*quantity: { type: Number, required: [true, 'Why no piad?']},*/
   price: { type: Number, required: [true, 'price required']},
   // complete later 
   macAddress: {type: String},
   startDate: { type:Date, required: [true, 'start date required']},
   endDate:{ type: Date, required: [true, 'end date required']},
   siteId: { type: String},

   status: { type: Number, default:1}
});

Order.plugin(textSearch);
Order.plugin(timestamps);
Order.index({ customer: 'text'});
exports.Order = mongoose.model('Order', Order);