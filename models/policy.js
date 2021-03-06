var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Policy = new Schema({
   name: { type: String, required: true},
   description: { type: String, required: true},
   status: { type: Number, default:1}
});

Policy.plugin(timestamps);
Policy.index({ name: 'text'});
exports.Policy = mongoose.model('Policy', Policy);