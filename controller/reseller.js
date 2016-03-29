var model = require("../models"),
    generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")(),
    reseller = null;


module.exports = {

  getReseller :function(username,cb){
    model.Reseller.findOne({email : username}, function(err, result){
      if(!err){
        cb(result);
      }else{
        cb(null);
      }
    });
  },

  getResellerId :function(id,cb){
    model.Reseller.findOne({_id : id}, function(err, result){
      if(!err){
        cb(result);
      }else{
        cb(null);
      }
    });
  },
  /* here we add a new user to the system */
  add: function (body, cb) {
    var obj = body;
    var salt = easyPbkdf2.generateSalt(); //we generate a new salt for every new user
    easyPbkdf2.secureHash( body.password, salt, function( err, passwordHash, originalSalt ) {
      obj.password = passwordHash;
      obj.salt = originalSalt;
      reseller = new model.Reseller(obj);
      reseller.save(function(err,result){
        if (!err) {
          delete result.password;
          delete result.salt;
          cb(result);
        } else {
          //TODO: return page with errors
          cb(false);
        }
      });
    });
  },
  edit: function(id,body,cb) {
    var obj = body;
    model.Reseller.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
};
