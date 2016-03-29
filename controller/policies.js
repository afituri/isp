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
    var obj ={
    name: body.name,
    type:body.type,
    discriptoin:body.discriptoin,
    initialPrice:body.initialPrice,
    item:null,
    packages:null
  }
  if(body.type=='item'){
    obj['item']={
      made:body.made,
      brand:body.brand
    }
  }else if(body.type=='package'){
    obj['packages']={
      renewPrice:body.renewPrice,
      GBPrice:body.GBPrice
    }
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
    type:body.type,
    discriptoin:body.discriptoin,
    initialPrice:body.initialPrice,
    item:null,
    packages:null
  }
  if(body.type=='item'){
    obj['item']={
      made:body.made,
      brand:body.brand
    }
  }else if(body.type=='package'){
    obj['packages']={
      renewPrice:body.renewPrice,
      GBPrice:body.GBPrice
    }
  }
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



