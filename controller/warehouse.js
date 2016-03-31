var model = require("../models"),
    generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")(),
    warehouse = null;


module.exports = {

  getWarehouses :function(cb){
    model.Warehouse.find({}, function(err, result){
      if(!err){
        cb(result);
      }else{
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
};
