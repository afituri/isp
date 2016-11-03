var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;

var Notice = new Schema({
   msg: {type: String , required:true},
   status: { type: Number, default:1}
});

Notice.plugin(textSearch);
Notice.plugin(timestamps);
Notice.index({ notice: 'text'});
exports.Notice = mongoose.model('Notice', Notice);