var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Buyings = new Schema({
   product: { type : mongoose.Schema.ObjectId, ref : 'Product'},
   buyingOrder: { type: Number, required: [true, 'Why no buyingOrder?']},
   quantity: { type: String, required: true},
   price: { type: Number, required: [true, 'Why no price?']},
   currency: { type: Number, required: [true, 'Why no currency?']},
   exchangeRate: { type: Number, required: [true, 'Why no exchangeRate?']},

   status: { type: Number, default:1}
});

Buyings.plugin(timestamps);
Buyings.index({ repName: 'text'});
exports.Buyings = mongoose.model('Buyings', Buyings);