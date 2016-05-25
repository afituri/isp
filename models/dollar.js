var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var  Dollar = new Schema({
   price: { type: Number, required: [true, 'Why no price?']},
   status: { type: Number, default:1}
});

Dollar.plugin(timestamps);
exports.Dollar = mongoose.model('Dollar', Dollar);