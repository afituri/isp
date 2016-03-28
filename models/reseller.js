var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

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
  policy: {type:Number, default:1}
});
Reseller.post('remove', function(doc) {
  console.log('%s has been removed', doc._id);
});
Reseller.plugin(timestamps); 
Reseller.index({ companyName: 'text'});
exports.Reseller = mongoose.model('Reseller', Reseller);