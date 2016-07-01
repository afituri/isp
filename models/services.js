var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Service = new Schema({
   name: { type: String, required : true},
   serviceprovider: { type: Schema.Types.ObjectId , ref: 'Serviceprovider'},
   description: { type: String, required : true},
   status: { type: Number, default:1}
});


Service.plugin(timestamps); 
Service.index({ name: 'text'});
exports.Service = mongoose.model('Service', Service);


