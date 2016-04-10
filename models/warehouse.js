var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Warehouse = new Schema({
   name: { type: String, required: true},
   city: { type: Number, required: [true, 'Why no city?']},
   area: { type: String, required: true},
   phone: { type: String, required: true},
   email: { type: String, required: true},
   
   status: { type: Number, default:1}
});

Warehouse.plugin(timestamps);
Warehouse.index({ name: 'text'});
exports.Warehouse = mongoose.model('Warehouse', Warehouse);