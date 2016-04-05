var model = require("../models"),
    generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")(),
    supplier = null;


module.exports = {

  getSupplier :function(limit,page,cb){
    page-=1;
    model.Supplier.count({},function(err,count){
      model.Supplier.find({}).limit(limit).skip(page*limit).exec(function(err, result){
        if(!err){
          cb({result:result,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  getSupplierId :function(id,cb){
    model.Supplier.findOne({_id : id}, function(err, result){
      if(!err){
        cb(result);
      }else{
        cb(null);
      }
    });
  },
  /* here we add a new user to the system */
  addSupplier: function (body, cb) {
    var obj = body;
    supplier = new model.Supplier(obj);
    supplier.save(function(err,result){
      if (!err) {
        cb(true);

      } else {
        //TODO: return page with errors
        cb(false);
      }
    });
  },
  updateSupplier: function(id,body,cb) {
    var obj = body;
    model.Supplier.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  deleteSupplier : function(id,cb){
    model.Product.find({supplier:id}, function(err,resultProduct) {
      if(resultProduct.length > 0){
        cb(1)
      } else{
        model.BuyingOrder.find({supplier:id}, function(err,resultBuyingOrder) {
          if(resultBuyingOrder.length > 0){
            cb(1)
          } else{
            model.Supplier.remove({_id:id}, function(err,result) {
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
