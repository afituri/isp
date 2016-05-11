var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Services = new Schema({
   name: { type: String, required : true},
   serviceprovider: { type: Schema.Types.ObjectId , ref: 'Serviceprovider'},
   description: { type: String, required : true},
   
   status: { type: Number, default:1}
});

Services.plugin(timestamps); 
Services.index({ name: 'text'});
exports.Service = mongoose.model('Service', Services);

