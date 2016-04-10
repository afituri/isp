var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var User = new Schema({
   name: { type: String, index: true, default: "Unknown user"},
   password: { type: String, required: true},
   salt: String,
   email: { type: String, unique : true, required : true},
   
   userRules:[{
      entity: { type: String, enum: ['service', 'item', 'package'], required: true},
      level: { type: Number, required: [true, 'Why no level?']},
   }],

   phone: {
      type: String,
      default:"NULL",
      validate: {
         validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
         },
         message: '{VALUE} is not a valid phone number!'
      },
      required: [true, 'User phone number required']
   },
   nid: {type: String, index: true},
  
   status: {type: Number, default:1}
});

User.plugin(timestamps);
User.index({ name: 'text'});
exports.User = mongoose.model('User', User);