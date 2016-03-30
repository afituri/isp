var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var ServiceProvider = new Schema({
  name: {type: String, required : true},
  email: {type: String, required : true},
  phone: {type: String, required : true},
  logo: {type: String, required : true},
  websit: {type: String, required : true},
  
  status: Boolean
});

ServiceProvider.plugin(timestamps); 
ServiceProvider.index({ name: 'text'});
exports.ServiceProvider = mongoose.model('ServiceProvider', ServiceProvider);