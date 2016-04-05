var model = require("../models"),
    generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")(),
    warehouse = null;


module.exports = {

  getWarehouses :function(limit,page,cb){
    page-=1;
    model.Warehouse.count({},function(err,count){
      model.Warehouse.find({}).limit(limit).skip(page*limit).exec(function(err, result){
        if(!err){
          cb({result:result,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  getWarehouseId :function(id,cb){
    model.Warehouse.findOne({_id : id}, function(err, result){
      if(!err){
        cb(result);
      }else{
        cb(null);
      }
    });
  },
  /* here we add a new user to the system */
  addWarehouse: function (body, cb) {
    var obj = body;
    warehouse = new model.Warehouse(obj);
    warehouse.save(function(err,result){
      if (!err) {
        cb(true);

      } else {
        //TODO: return page with errors
        cb(false);
      }
    });
  },
  updateWarehouse: function(id,body,cb) {
    var obj = body;
    model.Warehouse.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  deleteWarehouse : function(id,cb){
    model.inStock.find({warehouse:id}, function(err,resul) {
      if(resul.length > 0){
        cb(1)
      } else{
        model.Warehouse.remove({_id:id}, function(err,result) {
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

};
