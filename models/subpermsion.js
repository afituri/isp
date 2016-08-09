var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;

var Subpermsion = new Schema({
   pageName: { type: String},
   add: { type: Number, default:1},
   delete: { type: Number, default:1},
   update: { type: Number, default:1}, 
   permission: { type : mongoose.Schema.ObjectId, ref : 'Permission'},
});

Subpermsion.plugin(textSearch);
Subpermsion.plugin(timestamps);
Subpermsion.index({ subpermsion: 'text'});
exports.Subpermsion = mongoose.model('Subpermsion', Subpermsion);