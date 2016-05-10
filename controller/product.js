var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var product = null;

module.exports = {
  
  getProduct :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Product.count({},function(err,count){
      model.Product.find({}).limit(limit).skip(page*limit)
      .populate('Service')
      .exec(function(err, products){
        if(!err){
          cb({result:products,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },
  getProductItem :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Product.count({type:"item"},function(err,count){
      model.Product.find({type:"item"}).limit(limit).skip(page*limit)
      .populate('item.supplier')
      .exec(function(err, products){
        if(!err){
          cb({result:products,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllItem :function(cb){
    model.Product.find({type:"item"}).populate('supplier')
      .exec(function(err, products){
        if(!err){
          cb(products);
        }else{
          console.log(err);
          cb(null);
        }
      });
  },

  getProductService :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Product.count({type:"service"},function(err,count){
      model.Product.find({type:"service"}).limit(limit).skip(page*limit)
      .exec(function(err, products){
        if(!err){
          cb({result:products,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllService :function(cb){
    model.Product.find({type:"service"})
      .exec(function(err, products){
        if(!err){
          cb(products);
        }else{
          console.log(err);
          cb(null);
        }
      });
  },

     
   getServiceById :function(id,cb){
    model.Product.findOne({_id:id}, function(err, products){
        if(!err){
          cb(products);
        }else{
          cb(null);
        }
      });
  },

  getItemById: function(id,cb){
      model.Product.find({_id:id})
      .populate('item.supplier')
      .exec(function(err, products){
        if(!err){
          cb(products);
        }else{
          console.log(err);
          cb(null);
        }
      });

  },




  getProductPackage :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Product.count({type:"package"},function(err,count){
      model.Product.find({type:"package"}).limit(limit).skip(page*limit)
      .populate('packages.type')
      .exec(function(err, products){
        console.log(products);
        if(!err){
          cb({result:products,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllPackage :function(cb){
    model.Product.find({type:"package"}).populate('service')
      .exec(function(err, products){
        if(!err){
          cb(products);
        }else{
          console.log(err);
          cb(null);
        }
      });
  },

  getAllProduct :function(cb){
    model.Product.find({}).populate('Service')
      .exec(function(err, products){
        if(!err){
          cb(products);
        }else{
          console.log(err);
          cb(null);
        }
      });
  },
  
  addProduct : function(body,cb){
    var obj = body;
    product = new model.Product(obj);
    product.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        //TODO: return page with errors
        console.log(err);
        cb(false);
      }
    });
  },
/* for Service just insert those fields (name,discriptoin,initialPrice)*/
  newServiceProduct : function(body,cb){
    var name = body.name;
    var discriptoin=body.discriptoin;
    var initialPrice=body.initialPrice;
    var obj = {name:name,discriptoin:discriptoin,initialPrice:initialPrice}
    product = new model.Product(obj);
    product.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        //TODO: return page with errors
        console.log(err);
        cb(false);
      }
    });
  },

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

    updateService : function(id,body,cb){
    var obj ={
      name : body.name,
      discriptoin:body.discriptoin,
      initialPrice:body.initialPrice

    }
    model.Product.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateItem: function(id,body,cb){
    console.log("body");
    console.log(body);
    var obj ={
      name : body.name,
      discriptoin:body.discriptoin,
      initialPrice:body.initialPrice,
      item : {
         made:body.city,
         brand:body.item.brand,
         supplier: body.item.supplier
        }
      }
    model.Product.update({_id:id}, obj, function(err,result) {
      console.log(err);
      if (!err) {
        cb(true)
      } else {
        cb(false);
      }
    });
  },

  deleteProductService:function(id,cb){
    model.Product.remove({_id:id},function(err,result) {
      if (!err) {
        cb(2)
      } else {
        console.log(err);
        cb(3);
      }
  });
}






};