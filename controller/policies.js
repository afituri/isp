var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");


module.exports = {
  getPolicies :function(cb){
    console.log(model.Policie);
    model.Policie.find({},function(err, policies){
      if(!err){
        cb(policies);
      }else{
        cb(null);
      }
    });
  },

  getPolicyId :function(id,cb){
    model.Policie.findOne({_id : id}, function(err, policy){
      if(!err){
        cb(policy);
      }else{
        cb(null);
      }
    });
  },
 
};



