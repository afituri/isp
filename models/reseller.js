var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var Reseller = new Schema({
  repName:{type: String, required: true},
  companyName:{type: String, required: true},
  city: {type: Number, required: true},
  address:{type: String, required: true},
  langtitude:{type: String, required: true},
  longtitude:{type: String, required: true},
  email:{type: String, required: true},
  password: {type: String, required: true},
  salt: String,
  phone:{type: String, required: true},
  policy:{type: String, required: false},
  status: Boolean
});

Reseller.plugin(timestamps);
Reseller.index({ repName: 'text'});
module.exports = mongoose.model('Reseller', Reseller);
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

