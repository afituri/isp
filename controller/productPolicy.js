var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var productP = null;

module.exports = {
  getProductP :function(cb){
    model.ProductPolicy.find({},function(err, pPolicies){
      if(!err){
        cb(pPolicies);
      }else{
        cb(null);
      }
    });
  },
  getProduct :function(id,cb){
    model.ProductPolicy.find({policy:id},function(err, pPolicies){
      if(!err){
        cb(pPolicies);
      }else{
        cb(null);
      }
    });
  },
  getProductPId :function(id,cb){
    model.ProductPolicy.findOne({_id : id}, function(err, pPolicies){
      if(!err){
        cb(pPolicies);
      }else{
        cb(null);
      }
    });
  },
  
  addProductP : function(body,cb){
    var obj ={
    product: body.product,
    type:body.type,
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
    productP = new model.ProductPolicy(obj);
    productP.save(function(err,result){
      if (!err) {
        cb(true);

      } else {
        //TODO: return page with errors
        cb(false);
      }
    });
  },
  updateProductP : function(id,body,cb){
    var obj ={
    product: body.product,
    type:body.type,
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
    model.ProductPolicy.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
};



