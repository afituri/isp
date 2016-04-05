var generatePassword = require('password-generator'),
  easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var invoice = null;

module.exports = {

  deleteInvoice : function(id,cb){
    model.Order.find({invoice:id}, function(err,resultOrder) {
      if(resultOrder.length > 0){
        cb(1)
      } else{
        model.Invoice.remove({_id:id}, function(err,result) {
          if (!err) {
            cb(2)
          } else {
            console.log(err);
            cb(3);
          }
        });
      }
    });
  },

};