var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var buyingOrder = null;

module.exports = {

  deleteBuyingOrder : function(id,cb){
    model.Buyings.find({buyingOrder:id}, function(err,resultBuyings) {
      if(resultBuyings.length > 0){
        cb(1)
      } else{
        model.InStock.find({buyingOrder:id}, function(err,resultInStock) {
          if(resultInStock.length > 0){
            cb(1)
          } else{
            model.BuyingOrder.remove({_id:id}, function(err,result) {
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
  },

};