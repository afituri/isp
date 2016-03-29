var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var Policy = null;

module.exports = {
  getPolicies :function(cb){
    model.Policy.find({},function(err, policies){
      if(!err){
        cb(policies);
      }else{
        cb(null);
      }
    });
  },

  getPolicyId :function(id,cb){
    model.Policy.findOne({_id : id}, function(err, policy){
      if(!err){
        cb(policy);
      }else{
        cb(null);
      }
    });
  },
  
  addPolicy : function(body,cb){
    Policy = new model.Policy(body);
    Policy.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        //TODO: return page with errors
        cb(false);
      }
    });
  },
};



