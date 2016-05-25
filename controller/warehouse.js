var model = require("../models"),
    generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")(),
    warehouse = null;
    var autoIncrement = require('mongoose-auto-increment');


module.exports = {

  getWarehouses :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Warehouse.count({},function(err,count){
      model.Warehouse.find({}).limit(limit).skip(page*limit).exec(function(err, result){
        if(!err){
          cb({result:result,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllWarehouses :function(cb){
    model.Warehouse.find({},function(err, result){
      if(!err){
        cb({result:result});
      }else{
        console.log(err);
        cb(null);
      }
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
    // model.Warehouse.nextCount(function(err, count) {

    //   console.log(err);
    // });
    var obj = body;
    warehouse = new model.Warehouse(obj);
    warehouse.save(function(err,result){
      if (!err) {
        cb(true);

      } else {
        //TODO: return page with errors
        console.log(err);
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
    model.Instock.find({}, function(err,resul) {
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
