var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
// set up a mongoose model

var Stock = new Schema({
  name: {
    type: String,
    index: true,
    default: "Unknown Stock"
    required: true
  },
  city: {type: Number, required: [true, 'Why no city?']},
  area: {type: String, required: true},
  langtitude: {type: String, required: true},
  longtitude: {type: String, required: true},
  phone: {type: String, required: true},
  status: Boolean
});

Stock.plugin(timestamps);
Stock.index({ name: 'text'});
module.exports = mongoose.model('Stock', Stock);