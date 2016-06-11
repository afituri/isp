var generatePassword = require('password-generator'),
  easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var instockMgr = require("./inStock");
var invoice = null;
var dollarMgr = require("./dollar");
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

   getAllInvoices :function(cb){
    model.Invoice.find({},function(err, invoices){
      if(!err){
        cb(invoices);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  getInvoicesById :function(id,cb){
    model.Invoice.find({customer:id},function(err, invoices){
      if(!err){
        cb(invoices);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },




  deleteInvoice : function(id,cb){

    model.Order.remove.find({invoice:id}, function(err,resultOrder) {
      if(!err){
        model.Invoice.remove({_id:id}, function(err,result) {
          if (!err) {
            model.Instock.findOneAndUpdate({$and:[{status:2},{_id:id}]},{invoice:null,status:1} , function(err,result) {
              if (!err) {
                cb(true)
              } else {
                console.log(err);
                cb(false);
              }
            });
          } else {
            console.log(err);
            cb(3);
          }
        });
      } else{
        cb(1);
      }
    });
  },

  addInvoice : function(body,cb){
    model.Product.find({ $or: [ { _id:body.product}, {_id:body.productItem} ,{_id:body.productPackage} ]
      },function(err,product){
        if(body.reseller==1){
          body.reseller=null;
        }
        if(body.previousSubscription==1){
          customer = new model.Customer(body);
          customer.save(function(err,customerResult){
            if (!err) {
              invoice={
                customer:customerResult._id,
                type:body.type,
                notes:body.invoceNotes,
                piad:body.total,
                reseller:body.reseller,
                discount:body.discount,
                typein:body.typein
              };
              if(body.typein!=2){
                invoice.instock=body.inStockdata._id;
              }
              invoice=new model.Invoice(invoice);
              invoice.save(function(err,invoiceResult){
                if (!err) {
                  
                  var arrayOrd=[];
                  for( i in body.selectedProducts ){

                    model.Product.findOne({_id:body.selectedProducts[i].id},function(err,pro){
                      dollarMgr.getLastDollar(function(dollar){
                        Order={
                          invoice:invoiceResult._id,
                          product:pro._id,
                          price:pro.initialPrice*dollar[0].price,
                          startDate:body.startDate,
                          endDate:body.endDate
                        };

                        order=new model.Order(Order);
                        order.save(function(err,orderResult){
                          arrayOrd.push(orderResult);
                          arrayOfResult=[customerResult,invoiceResult,arrayOrd];
                          if(!err){
                            if(i==body.selectedProducts.length-1){
                              if(body.typein!=2){
                                model.Instock.findOneAndUpdate({$and:[{status:1},{_id:body.inStockdata._id}]},{invoice:invoiceResult._id,status:2} , function(err,result) {
                                  if (!err) {
                                    cb(arrayOfResult,false);
                                  } else {
                                    console.log(err);
                                    cb(false);
                                  }
                                });
                              }else{
                                cb(arrayOfResult,false);
                              }
                              
                              
                            }
                          } else {
                            cb(null,err)
                          }
                        });
                      });
                      });
                      
   
                  }
                } else {
                  console.log(err);
                  cb(null,err);
                }
              });
            } else {
              console.log(err);
              cb(null,err);
            }
          });
        }else{

          invoice={
            customer:body.customId,
            type:1,
            notes:body.invoceNotes,
            piad:body.total,
            reseller:body.reseller,
            discount:body.discount,
            typein:body.typein
          };
          if(body.typein!=2){
            invoice.instock=body.inStockdata._id;
          }
          invoice=new model.Invoice(invoice);
          invoice.save(function(err,invoiceResult){
            if (!err) {
              
              var arrayOrd=[];
              for( i in body.selectedProducts ){

                model.Product.findOne({_id:body.selectedProducts[i].id},function(err,pro){
                  dollarMgr.getLastDollar(function(dollar){
                    Order={
                      invoice:invoiceResult._id,
                      product:pro._id,
                      price:pro.initialPrice*dollar[0].price,
                      startDate:body.startDate,
                      endDate:body.endDate
                    };

                    order=new model.Order(Order);
                    order.save(function(err,orderResult){
                      arrayOrd.push(orderResult);
                      arrayOfResult=[null,invoiceResult,arrayOrd];
                      if(!err){
                        if(i==body.selectedProducts.length-1){
                          if(body.typein!=2){
                            model.Instock.findOneAndUpdate({$and:[{status:1},{_id:body.inStockdata._id}]},{invoice:invoiceResult._id,status:2} , function(err,result) {
                              if (!err) {
                                cb(arrayOfResult,false);
                              } else {
                                console.log(err);
                                cb(false);
                              }
                            });
                          }else{
                            cb(arrayOfResult,false);
                          }
                          
                          
                        }
                      } else {
                        cb(null,err)
                      }
                    });
                  });
                  });
                  

              }
            } else {
              console.log(err);
              cb(null,err);
            }
          });
        }



      });
  },

  updateInvoice : function(id,body,cb){
    var obj = body;
    model.Invoice.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  getInvoicedata :function(id,cb){
    model.Instock.findOne({invoice : id}, function(err, result){
      if(!err){
        // cb(result);
        model.Order.find({invoice : id}).populate('product')
        .exec(function(err, order){
          if(!err){
            // cb(result);



            model.Invoice.findOne({_id:id}).populate('customer').exec(function(err, invoices){
              if(!err){
                cb({instock:result,order:order,invoices:invoices});
              }else{
                console.log(err);
                cb(null);
              }
            });


          }else{
            console.log(err);
            cb(null);
          }
        });
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

renewInvice :function(body,cb){
  model.Invoice.findOne({_id:body.idCu},function(err, invoices){
    if (!err) {
      console.log(invoices);
      var invoice={
        customer:invoices.customer,
        type:1,
        invoice:body.idCu,
        notes:body.invoceNotes,
        piad:body.total,
        reseller:null,
        discount:body.discount,
        typein:3
      };
      invoice=new model.Invoice(invoice);
      invoice.save(function(err,invoiceResult){
        if (!err) {
          model.Product.findOne({_id:body.package},function(err,pro){
            dollarMgr.getLastDollar(function(dollar){
              Order={
                invoice:invoiceResult._id,
                product:pro._id,
                price:pro.initialPrice*dollar[0].price,
                startDate:body.startDate,
                endDate:body.endDate
              };
              order=new model.Order(Order);
              order.save(function(err,orderResult){
                if (!err) {
                  cb(invoiceResult);
                }else{
                  console.log(err);
                  cb(null);
                }
              });
            });
          });

        }else{
          console.log(err);
          cb(null);
        }
      });
    }else{
      console.log(err);
      cb(null);
    }
  });
},

addPaid :function(body,cb){
  model.Invoice.findOne({_id:body.idCu},function(err, invoices){
    if (!err) {
      var invoice={
        customer:invoices.customer,
        invoice:body.idCu,
        type:1,
        notes:'null',
        piad:body.paid,
        reseller:null,
        discount:0,
        typein:4
      };
      invoice=new model.Invoice(invoice);
      invoice.save(function(err,invoiceResult){
        if (!err) {
          cb(invoiceResult);
          
        }else{
          console.log(err);
          cb(null);
        }
      });
    }else{
      console.log(err);
      cb(null);
    }
  });
},


};