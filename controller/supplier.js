var model = require("../models"),
    generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")(),
    supplier = null;


module.exports = {

  getSupplier :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Supplier.count({},function(err,count){
      model.Supplier.find({}).limit(limit).skip(page*limit).exec(function(err, result){
        if(!err){
          cb({result:result,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getSupplierAll :function(searchString,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Supplier.count({'$or':[
            {'name':{'$regex':searchString, '$options':'i'}},
            {'email':{'$regex':searchString, '$options':'i'}},
            {'phone':{'$regex':searchString, '$options':'i'}},
            {'repName':{'$regex':searchString, '$options':'i'}},
            {'repPhone':{'$regex':searchString, '$options':'i'}}
            ]},function(err,count){
      model.Supplier.find({'$or':[
            {'name':{'$regex':searchString, '$options':'i'}},
            {'email':{'$regex':searchString, '$options':'i'}},
            {'phone':{'$regex':searchString, '$options':'i'}},
            {'repName':{'$regex':searchString, '$options':'i'}},
            {'repPhone':{'$regex':searchString, '$options':'i'}}
            ]}).limit(limit).skip(page*limit).exec(function(err, result){
        if(!err){
          cb({result:result,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllSupplier :function(cb){
    model.Supplier.find({},function(err, result){
      if(!err){
        cb(result);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

    getAllSupplierCount :function(cb){
    model.Supplier.count({},function(err, result){
      if(!err){
        cb({count:result});
      }else{
        console.log(err);
        cb(null);
      }
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
    model.Product.find({'item.supplier':id}, function(err,resultProduct) {
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