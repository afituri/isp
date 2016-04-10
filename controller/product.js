var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var product = null;

module.exports = {

  deletePolicy : function(id,cb){
    model.Buyings.find({product:id}, function(err,resultBuyings) {
      if(resultBuyings.length > 0){
        cb(1)
      } else{
        model.InStock.find({policy:id}, function(err,resultInStock) {
          if(resultInStock.length > 0){
            cb(1)
          } else{
            model.Order.find({product:id}, function(err,resultOrder) {
              if(resultOrder.length > 0){
                cb(1)
              } else{
                model.ProductPolicy.find({product:id}, function(err,resultProductPolicy) {
                  if(resultProductPolicy.length > 0){
                    cb(1)
                  } else{
                    model.Product.remove({_id:id}, function(err,result) {
                      if (!err) {
                        cb(2)
                      } else {
                        console.log(err);
                        cb(3);
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  },

};