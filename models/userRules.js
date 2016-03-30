var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;
// set up a mongoose model

var UserRules = new Schema({
   // user
   entity: { type: String, enum: ['service', 'item', 'package'], required: true},
   level: {type: Number, required: [true, 'Why no type?']},
   
   status: Boolean  
});

UserRules.index({ UserRules: 'text'});
exports.UserRules = mongoose.model('UserRules', UserRules);