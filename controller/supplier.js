var model = require("../models"),
    generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")(),
    supplier = null;


module.exports = {

  getSupplier :function(cb){
    model.Supplier.find({}, function(err, result){
      if(!err){
        cb(result);
      }else{
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
};
