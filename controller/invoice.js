var generatePassword = require('password-generator'),
  easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var invoice = null;

module.exports = {


  getInvoice :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Invoice.count({},function(err,count){
      model.Invoice.find({}).limit(limit).skip(page*limit).exec(function(err, invoices){
        if(!err){
          cb({result:invoices,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

   getAllInvoices :function(limit,page,cb){
    model.Invoice.find({},function(err, invoices){
      if(!err){
        cb(invoices);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },




  deleteInvoice : function(id,cb){
    model.Order.find({invoice:id}, function(err,resultOrder) {
      if(resultOrder.length > 0){
        cb(1)
      } else{
        model.Invoice.remove({_id:id}, function(err,result) {
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

  addInvoice : function(body,cb){
    console.log(body);
    customerObj = {
      name: body.name ,
      repName: body.repName,
      city: body.city,
      address: body.address,
      email: body.email,
      phone: body.phone,
      type: body.type
      /*reseller: body.,
      notes: body.notes*/
     /* policy: */
    }
   /* var obj = body;
    invoice = new model.Invoice(obj);
    invoice.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        //TODO: return page with errors
        console.log(err);
        cb(false);
      }
    });*/
  },

  updateInvoice : function(id,body,cb){
    var obj ={
     
    }
    model.Invoice.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  }















};