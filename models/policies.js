var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Policy = new Schema({
   name: { type: String, required: true},
   type: { type: String, enum: ['Service', 'Item', 'Package'], required: true},
   discriptoin: { type: String, required: true},
   initialPrice: { type: Number, required: true},
   item: {
      // supplier:{type: String, required: true},
      made:{type: Number, required: true},
      brand:{type: String, required: true}
   },
   packages: {
      renewPrice: { type: Number, required: true},
      GBPrice: { type: Number, required: true},
   },
   status: Boolean
});

Policy.plugin(timestamps);
Policy.index({ name: 'text'});
exports.Policy = mongoose.model('Policy', Policy);


// policie{
//    name:"",
//    discription:"",

//    productPolicie:[{
//       product:"",
//       policiePrice:32,
//       packages:{
//          renewPrice:43,
//          GBPrice:34
//          }
//       }
//    ]
// }