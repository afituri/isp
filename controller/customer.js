var generatePassword = require('password-generator'),
  easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var customer = null;

module.exports = {

  getCustomer :function(status,limit,page,cb){
    if(status==-1){
      page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Customer.count({},function(err,count){
      model.Customer.find({}).limit(limit).skip(page*limit)
      .populate('user')
      .populate('reseller')
      .exec(function(err, customers){
        if(!err){
          //console.log(customers);
          cb({result:customers,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });

    } else {
      page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Customer.count({status:status},function(err,count){
      model.Customer.find({status:status}).limit(limit).skip(page*limit)
      .populate('user')
      .populate('reseller')
      .exec(function(err, customers){
        if(!err){
          //console.log(customers);
          cb({result:customers,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });

    }
    
  },

  getCustomerReseller :function(id,idP,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var con={};
    if (idP!=-1){
      con={
        product:idP
      }
    }
    model.Order.find(con).distinct('invoice',function(err, idin){
      model.Invoice.find({_id:{$in:idin}}).distinct('customer',function(err, idC){
        var options={
          _id:{$in:idC},
          status:{$ne:3}
        }
        if(id!=-1){
          options={
            _id:{$in:idC},
            status:{$ne:3},
            reseller:id
          }
        }
        model.Customer.count(options,function(err,count){
          model.Customer.find(options).skip(page*limit)
          .populate('user')
          .populate('reseller')
          .exec(function(err, customers){
            if(!err){
              //console.log(customers);
              cb({result:customers,count:count});
            }else{
              console.log(err);
              cb(null);
            }
          });
        });
      });
    });

    
  },
  getCustomerReject :function(user,status,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Customer.count({status:status,reseller:user},function(err,count){
      model.Customer.find({status:status,reseller:user}).limit(limit).skip(page*limit)
      .populate('user')
      .populate('reseller')
      .exec(function(err, customers){
        if(!err){
          //console.log(customers);
          cb({result:customers,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllCustomer :function(cb){
    model.Customer.find({},function(err, customers){
      if(!err){
        cb(customers);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  //getAllCustomerCount
    getAllCustomerCount :function(cb){
    model.Customer.count({},function(err, customers){
      if(!err){
        cb({count:customers});
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  getAllCustomerRes :function(id,cb){
    model.Customer.find({status:{$ne:3},reseller:id},function(err, customers){
      if(!err){
        cb(customers);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },


  getAllCustomerStatus:function(status,cb){
    model.Customer.find({status:status},function(err, customers){
      if(!err){
        cb(customers);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  getAllCustomerReseller :function(id,cb){
    model.Customer.find({reseller:id},function(err, customers){
      if(!err){
        cb(customers);
      }else{
        console.log(err);
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
  
  getCustomerName :function(name,cb){
    model.Customer.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, custom){
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
      notes : body.notes,
      status : body.status,
      user: body.user,
      reseller : body.reseller
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

  updateCustomerById : function(customerId,adminId,cb){
    obj={
      status:1,
      user : adminId
    }
     model.Customer.findOneAndUpdate({_id:customerId},obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });

  },

  updateRejectCustomer : function(customerId,adminId,obj,cb){
    obj={
      status:3,
      user : adminId,
      reject_message : obj.reject_message
    }
     model.Customer.findOneAndUpdate({_id:customerId},obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
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