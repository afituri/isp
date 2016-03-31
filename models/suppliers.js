var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Supplier = new Schema({

  name:{type: String, required : true},
  email : {type: String, required : true},
  phone : {type: String, required : true},
  repName:{type: String, required : true},
  repPhone: {type: String, required : true},
  notes:: {type: String, required : true}
});

Supplier.plugin(timestamps); 
Supplier.index({ name: 'text'});
exports.Supplier = mongoose.model('Supplier', Supplier);