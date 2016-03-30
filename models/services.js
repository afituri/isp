var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// set up a mongoose model

var Services = new Schema({
  name: {type: String, required : true},
  // servicesProvider: {type: Schema.Types.ObjectId , ref: 'serviceProvider'},
  discriptoin: {type: String, required : true},
  status: Boolean
});

Services.plugin(timestamps); 
Services.index({ name: 'text'});
exports.Services = mongoose.model('Services', Services);

