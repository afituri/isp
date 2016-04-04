var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var ServiceProvider = new Schema({
   name: {type: String, required : true},
   email: {type: String, required : true},
   phone: {type: String, required : true},
   logo: {type: String},
   website: {type: String, required : true},
  
   status: {type: Number, default:1}
});

ServiceProvider.plugin(timestamps); 
ServiceProvider.index({ name: 'text'});
exports.ServiceProvider = mongoose.model('ServiceProvider', ServiceProvider);