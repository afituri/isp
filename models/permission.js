var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;

var Permission = new Schema({
   name: { type: String},
   status: { type: Number, default:1}
});

Permission.plugin(textSearch);
Permission.plugin(timestamps);
Permission.index({ permission: 'text'});
exports.Permission = mongoose.model('Permission', Permission);