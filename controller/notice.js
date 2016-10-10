var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var buyingOrder = null;

module.exports = {

  addNotice : function(body,cb){
    console.log(body);
    Notice = new model.Notice(body);
    Notice.save(function(err,result){
      if (!err) {
        cb(true);

      } else {
        //TODO: return page with errors
        cb(false);
      }
    });
  },


  
};