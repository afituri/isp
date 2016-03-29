var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
// set up a mongoose model

var Stock = new Schema({
  stock: {
    type: String,
    index: true,
    default: "Unknown Stock"
    required: true
  },
  item: {type: Number, required: [true, 'Why no city?']},
  quantity: {type: String, required: true},
  buyingOrder: {type: String, required: true},
  
  status: Boolean
});

Stock.plugin(timestamps);
Stock.index({ name: 'text'});
module.exports = mongoose.model('Stock', Stock);