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
      model.Invoice.find({}).limit(limit).skip(page*limit)
      .populate('customer')
      .populate('reseller')
      .populate('user')
      .exec(function(err, invoices){
        if(!err){
          cb({result:invoices,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },


  getProductMack : function(id,cb){
    idInvoiceArray=[];
     instock =[];
    model.Invoice.find({customer:id})
      .exec(function(err, invoices){
        if(!err){
         for(i in invoices){
          if(invoices[i].typein==1){
            idInvoiceArray.push(invoices[i]._id);
          }
         }
         
         if(idInvoiceArray.length==0){
          cb(false);

         } else {
          t=0;
          for(var k=0;k<idInvoiceArray.length;k++){
              /*console.log(idInvoiceArray.length);
                  console.log(k);*/
            model.Instock.find({status:2,invoice:idInvoiceArray[k]})
              .populate('product')
              .populate('warehouse')
              .exec(function(err, result){
                if(!err){
                  instock.push(result);

                  if(t==idInvoiceArray.length-1){
                    cb({result:instock});
                }
                t++;
                }else{
                  console.log(err);
                  cb(null);
                }
              });
          }
   

}



        }else{
          console.log(err);
          cb(null);
        }
      });
   
  

  },



    getInvoicePending :function(status,limit,page,cb){
      if(status==0){
        page = parseInt(page);
        page-=1;
        limit = parseInt(limit);
        model.Invoice.count({},function(err,count){
        model.Invoice.find({}).limit(limit).skip(page*limit)
        .populate('customer')
        .populate('reseller')
        .populate('user')
        .exec(function(err, invoices){
          if(!err){
            cb({result:invoices,count:count});
          }else{
            console.log(err);
            cb(null);
        }
      });
    });
      } else if(status==1){
             page = parseInt(page);
        page-=1;
        limit = parseInt(limit);
        model.Invoice.count({status:1},function(err,count){
        model.Invoice.find({status:1}).limit(limit).skip(page*limit)
        .populate('customer')
        .populate('reseller')
        .populate('user')
        .exec(function(err, invoices){
          if(!err){
            cb({result:invoices,count:count});
          }else{
            console.log(err);
            cb(null);
        }
      });
    });

      } else if(status==2) {
        page = parseInt(page);
        page-=1;
        limit = parseInt(limit);
        model.Invoice.count({status:2},function(err,count){
        model.Invoice.find({status:2}).limit(limit).skip(page*limit)
        .populate('customer')
        .populate('reseller')
        .populate('user')
        .exec(function(err, invoices){
          if(!err){
            cb({result:invoices,count:count});
          }else{
            console.log(err);
            cb(null);
        }
      });
    });


      } else if(status==3) {
        page = parseInt(page);
        page-=1;
        limit = parseInt(limit);
        model.Invoice.count({status:3},function(err,count){
        model.Invoice.find({status:3}).limit(limit).skip(page*limit)
        .populate('customer')
        .populate('reseller')
        .populate('user')
        .exec(function(err, invoices){
          if(!err){
            cb({result:invoices,count:count});
          }else{
            console.log(err);
            cb(null);
        }
      });
    });


      }
    
  },


  getInvoicePendingRes :function(status,id,limit,page,cb){
      if(status==0){
        page = parseInt(page);
        page-=1;
        limit = parseInt(limit);
        model.Invoice.count({reseller:id},function(err,count){
        model.Invoice.find({reseller:id}).limit(limit).skip(page*limit)
        .populate('customer')
        .populate('reseller')
        .populate('user')
        .exec(function(err, invoices){
          if(!err){
            cb({result:invoices,count:count});
          }else{
            console.log(err);
            cb(null);
        }
      });
    });
      } else if(status==1){
             page = parseInt(page);
        page-=1;
        limit = parseInt(limit);
        model.Invoice.count({status:1,reseller:id},function(err,count){
        model.Invoice.find({status:1,reseller:id}).limit(limit).skip(page*limit)
        .populate('customer')
        .populate('reseller')
        .populate('user')
        .exec(function(err, invoices){
          if(!err){
            cb({result:invoices,count:count});
          }else{
            console.log(err);
            cb(null);
        }
      });
    });

      } else if(status==2) {
        page = parseInt(page);
        page-=1;
        limit = parseInt(limit);
        model.Invoice.count({status:2,reseller:id},function(err,count){
        model.Invoice.find({status:2,reseller:id}).limit(limit).skip(page*limit)
        .populate('customer')
        .populate('reseller')
        .populate('user')
        .exec(function(err, invoices){
          if(!err){
            cb({result:invoices,count:count});
          }else{
            console.log(err);
            cb(null);
        }
      });
    });


      } else if(status==3) {
        page = parseInt(page);
        page-=1;
        limit = parseInt(limit);
        model.Invoice.count({status:3,reseller:id},function(err,count){
        model.Invoice.find({status:3,reseller:id}).limit(limit).skip(page*limit)
        .populate('customer')
        .populate('reseller')
        .populate('user')
        .exec(function(err, invoices){
          if(!err){
            cb({result:invoices,count:count});
          }else{
            console.log(err);
            cb(null);
        }
      });
    });


      }
    
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

  getInvoicesById :function(status,id,cb){
    model.Invoice.find({customer:id})
        .populate('customer')
        .populate('reseller')
        .populate('user')
        .exec(function(err, invoices){
      if(!err){
        cb(invoices);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },




  deleteInvoice : function(id,cb){
    model.Order.remove({invoice:id}, function(err,resultOrder) {
      if(!err){
        model.Invoice.remove({_id:id}, function(err,result) {
          if (!err) {
            model.Instock.findOneAndUpdate({$and:[{status:2},{_id:id}]},{invoice:null,status:1} , function(err,result) {
              if (!err) {
                cb(true)
              } else {
                cb(false);
              }
            });
          } else {
            cb(3);
          }
        });
      } else{
        cb(1);
      }
    });
  },

  addInvoice : function(body,cb){
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
                piad:body.total-body.discount,
                reseller:body.reseller,
                discount:body.discount,
                typein:body.typein,
                startDate:body.startDate,
                endDate:body.endDate
              };
              if(body.typein!=2){
                invoice.instock=body.inStockdata._id;
              }
              invoice=new model.Invoice(invoice);
              invoice.save(function(err,invoiceResult){
                if (!err) {
                  if(body.paid!=0){
                    var Paid={
                      customer:customerResult._id,
                      invoice:invoiceResult._id,
                      type:1,
                      notes:body.paidNotes,
                      piad:body.paid,
                      reseller:null,
                      discount:0,
                      typein:4
                    };
                    invoice=new model.Invoice(Paid);
                    invoice.save();}
                  var arrayOrd=[];
                  for( i in body.selectedProducts ){

                    model.Product.findOne({_id:body.selectedProducts[i].id},function(err,pro){
                      dollarMgr.getLastDollar(function(dollar){
                        Order={
                          invoice:invoiceResult._id,
                          product:pro._id,
                          price:pro.initialPrice,
                          startDate:body.startDate,
                          endDate:body.endDate
                        };

                        if(pro.type=='package'){
                          var months;
                          
                          var end = new Date(body.endDate);
                          var start = new Date(body.startDate);
                          months =(end.getFullYear() -start.getFullYear() )* 12;
                          months += end.getMonth()-start.getMonth() + 1;
                          var money=parseFloat(body.total)-parseFloat(pro.initialPrice)*parseFloat(dollar[0].price);
                          money=money+parseFloat(pro.initialPrice)*parseFloat(dollar[0].price)*parseFloat(body.month)+(pro.initialPrice/31*body.day);
                          money-=parseFloat(body.discount);
                          Order.price=pro.initialPrice*dollar[0].price*parseFloat(body.month)+(pro.initialPrice/31*body.day);
                          model.Invoice.findOneAndUpdate({_id:invoiceResult._id}, {piad:money},function(err,re){
                          });
                        }
                        

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
            piad:0,
            reseller:body.reseller,
            discount:body.discount,
            startDate:body.startDate,
            endDate:body.endDate,
            typein:body.typein
          };
          if(body.typein!=2){
            invoice.instock=body.inStockdata._id;
          }
          invoice=new model.Invoice(invoice);
          invoice.save(function(err,invoiceResult){
            if (!err) {
              if(body.paid!=0){
                var Paid={
                  customer:body.customId,
                  invoice:invoiceResult._id,
                  type:1,
                  notes:body.paidNotes,
                  piad:body.paid,
                  reseller:null,
                  discount:0,
                  typein:4
                };
                invoice=new model.Invoice(Paid);
                invoice.save();
                }
              var arrayOrd=[];
              for( i in body.selectedProducts ){

                model.Product.findOne({_id:body.selectedProducts[i].id},function(err,pro){
                  dollarMgr.getLastDollar(function(dollar){
                    Order={
                      invoice:invoiceResult._id,
                      product:pro._id,
                      price:pro.initialPrice,
                      startDate:body.startDate,
                      endDate:body.endDate
                    };
                    if(pro.type=='package'){
                          var months;
                          
                          var end = new Date(body.endDate);
                          var start = new Date(body.startDate);
                          months =(end.getFullYear() -start.getFullYear() )* 12;
                          months += end.getMonth()-start.getMonth() + 1;
                          var money=parseFloat(body.total)-parseFloat(pro.initialPrice)*parseFloat(dollar[0].price);
                          money=money+parseFloat(pro.initialPrice)*parseFloat(dollar[0].price)*parseFloat(body.month)+(pro.initialPrice/31*body.day);
                          money-=parseFloat(body.discount);
                          Order.price=pro.initialPrice*dollar[0].price*parseFloat(body.month)+(pro.initialPrice/31*body.day);
                          model.Invoice.findOneAndUpdate({_id:invoiceResult._id}, {piad:money},function(err,re){
                          });
                        }
                    

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
  },

  updateInvoice : function(id,body,cb){
    if(body.status==-9){
      var obj = {status:1}
      model.Invoice.findOneAndUpdate({_id:id}, obj, function(err,result) {       
        if (!err) {
          model.Customer.findOneAndUpdate({_id:result.customer}, obj, function(err,result) {
          if (!err) {
             cb(true)
          } else {
            cb(false);
          }
          });
        } else {
          console.log(err);
          cb(false);
        }
      });
    } else {

    var obj = body;
    model.Invoice.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        if(body.status == 3){
          model.Instock.findOneAndUpdate({invoice:id},{status:1},function(err,result) { 
            cb(true);
          }) ;
        }else{
          cb(true);
        }
        
      } else {
        console.log(err);
        cb(false);
      }
    });
  }
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

      var invoice={
        customer:invoices.customer,
        type:1,
        invoice:body.idCu,
        notes:body.invoceNotes,
        piad:body.total,
        reseller:null,
        discount:body.discount,
        typein:3,
        startDate:body.startDate,
        endDate:body.endDate
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
              if(pro.type=='package'){
                var months;
                
                var end = new Date(body.endDate);
                var start = new Date(body.startDate);
                months =(end.getFullYear() -start.getFullYear() )* 12;
                months += end.getMonth()-start.getMonth() + 1;
                var money=parseFloat(body.total)-parseFloat(pro.initialPrice)*parseFloat(dollar[0].price);
                money=money+parseFloat(pro.initialPrice)*parseFloat(dollar[0].price)*parseFloat(months);
                money-=parseFloat(body.discount);
                Order.price=pro.initialPrice*dollar[0].price*months;
                // model.Invoice.findOneAndUpdate({_id:invoiceResult._id}, {piad:money},function(err,re){
                // });
              }
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

renewInvicePending :function(body,cb){
  model.Invoice.findOne({_id:body.idCu},function(err, invoices){
    if (!err) {
      var invoice={
        customer:invoices.customer,
        type:1,
        invoice:body.idCu,
        notes:body.invoceNotes,
        piad:body.total,
        reseller:null,
        discount:body.discount,
        typein:3,
        status:2,
        startDate:body.startDate,
        endDate:body.endDate
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
        typein:4,
        notes: body.notes
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

addPaidPending :function(body,cb){
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
        typein:4,
        status:2
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
addGiga:function(body,cb){
  model.Invoice.findOne({_id:body.idin},function(err, invoices){
    if (!err) {
      var invoice={
        customer:invoices.customer,
        invoice:body.idin,
        type:1,
        piad:body.price,
        reseller:null,
        discount:0,
        typein:5,
        notes: body.notes
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
replacInvice:function(body,cb){
  model.Invoice.findOne({_id:body.idin},function(err, invoices){
    if (!err) {
      var invoice={
        customer:invoices.customer,
        invoice:body.idin,
        type:1,
        piad:body.price,
        reseller:null,
        discount:0,
        typein:6,
        notes: body.notes
      };
      invoice=new model.Invoice(invoice);
      invoice.save(function(err,invoiceResult){
        if (!err) {
          model.Product.findOne({_id:body.product},function(err,pro){
            Order={
              invoice:invoiceResult._id,
              product:pro._id,
              price:body.price,
              startDate:new Date(),
              endDate:new Date()
            };
            order=new model.Order(Order);
            order.save(function(err,orderResult){
              if(!err){
                model.Instock.findOne({invoice:body.idin,status:2},function(err,instockOld){
                  if(!err){
                    model.Instock.findOneAndUpdate({$and:[{status:1},{_id:body.mac}]},{invoice:body.idin,status:2,username:instockOld.username,password:instockOld.password} , function(err,result) {
                      if (!err) {
                        model.Instock.findOneAndUpdate({_id:instockOld._id},{status:5} , function(err,result) {
                          if(!err){
                            cb(invoiceResult);
                          }else{
                            console.log(err);
                            cb(false);
                          }
                        });
                      } else {
                        console.log(err);
                        cb(false);
                      }
                    }); 
                  } else {
                    console.log(err);
                    cb(false);
                  }
                  
                });
                
              } else {
                console.log(err);
                cb(null,err)
              }
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
getNotification:function(cb){
  model.Invoice.count({status:2},function(err,count){
    model.Invoice.find({status:2})
    .populate('customer')
    .populate('reseller')
    .populate('user')
    .exec(function(err, invoices){
      if(!err){
        cb({result:invoices,count:count});
      }else{
        console.log(err);
        cb(null);
      }
    });
  });
},
getInvoicePendingReseller :function(status,reseller,limit,page,cb){
  page = parseInt(page);
  page-=1;
  limit = parseInt(limit);
  var q={};
  if(parseInt(status)){
    q.status=status;
  }
  if(parseInt(reseller)){
    q.reseller=reseller;
  }
  model.Invoice.count(q,function(err,count){
    model.Invoice.find(q).limit(limit).skip(page*limit)
    .populate('customer')
    .populate('reseller')
    .populate('user')
    .exec(function(err, invoices){
      if(!err){
        cb({result:invoices,count:count});
      }else{
        console.log(err);
        cb(null);
      }
    });
  });
    
  },
};