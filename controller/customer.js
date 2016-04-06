var generatePassword = require('password-generator'),
  easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var customer = null;

module.exports = {

  getCustomer :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Customer.count({},function(err,count){
      model.Customer.find({}).limit(limit).skip(page*limit).exec(function(err, customers){
        if(!err){
          cb({result:customers,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
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
        console.log(err);
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
  
  deleteCustomer : function(id,cb){
    model.Invoice.find({customer:id}, function(err,resul) {
      if(resul.length > 0){
        cb(1)
      } else{
        model.Customer.remove({_id:id}, function(err,result) {
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