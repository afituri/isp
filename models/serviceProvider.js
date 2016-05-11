var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Serviceprovider = new Schema({
   name: { type: String, required : true},
   email: { type: String, required : true},
   phone: { type: String, required : true},
   logo: { type: String},
   website: { type: String, required : true},
  
   status: { type: Number, default:1}
});

Serviceprovider .plugin(timestamps); 
Serviceprovider .index({ name: 'text'});
exports.Serviceprovider = mongoose.model('Serviceprovider', Serviceprovider);