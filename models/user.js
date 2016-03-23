var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var User = new Schema({
    name: {type: String, index: true, default: "Unknown user"},
  	password: {type: String, required: true},
  	salt: String,
  	email: {type: String, unique : true, required : true},
    phone: {type: String, default:"NULL"},
    nid: {type: String, index: true},
  	status: Boolean
  	
});
User.plugin(timestamps);
User.index({ name: 'text'});
module.exports = mongoose.model('User', User);