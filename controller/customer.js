var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var customer = null;

module.exports = {
  getCustomer :function(cb){
    model.Customer.find({},function(err, customers){
      if(!err){
        cb(customers);
      }else{
        cb(null);
      }
    });
  },

  getCustomerId :function(id,cb){
    model.Customer.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },
  
  addCustomer : function(body,cb){
    var obj ={
      name : body.name,
      repName : body.repName,
      city : body.city,
      address : body.address,
      email : body.email,
      phone : body.phone,
      type : body.type,
      notes : body.notes
  }
    customer = new model.Customer(obj);
    customer.save(function(err,result){
      if (!err) {
        cb(true);

      } else {
        //TODO: return page with errors
        cb(false);
      }
    });
  },
  updateCustomer : function(id,body,cb){
    var obj ={
      name : body.name,
      repName : body.repName,
      city : body.city,
      address : body.address,
      email : body.email,
      phone : body.phone,
      type : body.type,
      notes : body.notes
  }
    model.Customer.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
};



