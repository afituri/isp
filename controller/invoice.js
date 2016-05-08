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
    model.Product.find({ $or: [ { _id:body.product}, {_id:body.productItem} ,{_id:body.productPackage} ]
      },function(err,product){
        customer = new model.Customer(body);
        customer.save(function(err,customerResult){
          if (!err) {
            invoice={
              customer:customerResult._id,
              type:1,
              notes:body.invoceNotes,
              piad:body.total,
              discount:body.discount
            };
            invoice=new model.Invoice(invoice);
            invoice.save(function(err,invoiceResult){
              if (!err) {
                order1={
                  invoice:invoiceResult._id,
                  product:body.product,
                  price : product[0].initialPrice,
                  startDate:body.startDate,
                  endDate:body.endDate
                };
                order2={
                  invoice:invoiceResult._id,
                  product:body.productItem,
                  price : product[1].initialPrice,
                  startDate:body.startDate,
                  endDate:body.endDate
                };
                order3={
                  invoice:invoiceResult._id,
                  product:body.productPackage,
                  price : product[2].initialPrice,
                  startDate:body.startDate,
                  endDate:body.endDate
                };
                var arrayOrder=[order1,order2,order3];
                var counter=0;
                var arrayOrd=[];
                for(var i=0;i<3;i++){
                  order=new model.Order(arrayOrder[i]);
                  order.save(function(err,orderResult){
                    arrayOrd.push(orderResult);
                    arrayOfResult=[customerResult,invoiceResult,arrayOrd];
                    if(!err){
                      counter++;
                      if(counter==3){
                        cb(arrayOfResult,false);
                      }
                    } else {
                      console.log()
                      cb(null,err)
                    }
                  });
                }
              } else {
                cb(null,err);
              }
            });
          } else {
            cb(null,err);
          }
        });
      });
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