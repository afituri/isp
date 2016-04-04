var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var Policy = null;

module.exports = {
  getPolicies :function(limit,page,cb){
    page-=1;
    model.Policy.count({},function(err,count){
      model.Policy.find({}).limit(limit).skip(page*limit).exec(function(err,policies){
        if(!err){
          cb({result:policies,count:count});
        }else{
          cb(null);
        }
      });
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
    var obj ={
    name: body.name,
    discriptoin:body.discriptoin
    }
    Policy = new model.Policy(obj);
    Policy.save(function(err,result){
      if (!err) {
        cb(true);

      } else {
        //TODO: return page with errors
        cb(false);
      }
    });
  },
  updatePolicy : function(id,body,cb){
    var obj ={
    name: body.name,
    discriptoin:body.discriptoin
    }
    model.Policy.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
};



