var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var productP = null;

module.exports = {
  getProductP :function(type,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Productpolicy.count({type:type},function(err,count){
      model.Productpolicy.find({type:type}).limit(limit).skip(page*limit)
      .populate('policy')
      .populate('product')
      .exec(function(err, pPolicies){
        if(!err){
          cb({result:pPolicies,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllProductP :function(cb){
    model.Productpolicy.find({},function(err, pPolicies){
      if(!err){
        cb(pPolicies);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },


/*  getProductP :function(id,cb){
    model.ProductPolicy.find({policy:id},function(err, pPolicies){
      if(!err){
        cb(pPolicies);
      }else{
        cb(null);
      }
    });
  },*/
  getProductPId :function(id,cb){
    model.Productpolicy.findOne({_id : id}, function(err, pPolicies){
      if(!err){
        cb(pPolicies);
      }else{
        cb(null);
      }
    });
  },
  getProductPPolicy :function(policy,cb){
    model.Productpolicy.find({policy:policy}, function(err, pPolicies){
      if(!err){
        var obj=[];
        for(i in pPolicies){
          obj[pPolicies[i].product]=pPolicies[i].initialPrice;
          if(i==pPolicies.length-1){
            cb(obj);    
          }
        }
        
      }else{
        cb(null);
      }
    });
  },
  getByPolicy :function(idpr,cb){
    model.Productpolicy.find({policy:idpr}, function(err, pPolicies){
      if(!err){
        cb(pPolicies);
      }else{
        cb(null);
      }
    });
  },
  addProductP : function(body,cb){
  //   var obj ={
  //   product: body.product,
  //   type:body.type,
  //   initialPrice:body.initialPrice,
  //   item:null,
  //   packages:null
  // }
  // if(body.type=='item'){
  //   obj['item']={
  //     made:body.made,
  //     brand:body.brand
  //   }
  // }else if(body.type=='package'){
  //   obj['packages']={
  //     renewPrice:body.renewPrice,
  //     GBPrice:body.GBPrice
  //   }
  // }
    var obj=body;
    productP = new model.Productpolicy(obj);
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
  //   var obj ={
  //   product: body.product,
  //   type:body.type,
  //   initialPrice:body.initialPrice,
  //   item:null,
  //   packages:null
  // }
  // if(body.type=='item'){
  //   obj['item']={
  //     made:body.made,
  //     brand:body.brand
  //   }
  // }else if(body.type=='package'){
  //   obj['packages']={
  //     renewPrice:body.renewPrice,
  //     GBPrice:body.GBPrice
  //   }
  // }
    var obj=body;

    model.Productpolicy.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  deleteProductPolicy : function(id,cb){
    model.Invoice.find({customer:id}, function(err,resul) {
      if(resul.length > 0){
        cb(1)
      } else{
        model.Productpolicy.remove({_id:id}, function(err,result) {
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

  deleteProductPolicyService : function(id,cb){
/*    model.Invoice.find({customer:id}, function(err,resul) {
      if(resul.length > 0){
        cb(1)
      } else{*/
        model.Productpolicy.remove({_id:id}, function(err,result) {
          if (!err) {
            cb(2)
          } else {
            console.log(err);
            cb(3);
          }
        });
     // }
   // });
  },

};