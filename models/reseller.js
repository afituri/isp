var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Reseller = new Schema({
   repName: {type: String},
   companyName: {type:String, index: true},
   city: Number,
   address: String,
   langtitude: String,
   longtitude: String,
   email: {type: String, unique : true, required : true},
   password: {type: String, required: true},
   salt: String,
   status: { type: Number, min: 1, max: 10, default:1 },
   phone: String,
   // policy: {type:Number, default:1}
   policy: [{type: mongoose.Schema.Types.ObjectId, ref: 'Policy'}],

   status: Boolean
});

Reseller.plugin(timestamps); 
Reseller.index({ repName: 'text'});
exports.Reseller = mongoose.model('Reseller', Reseller);