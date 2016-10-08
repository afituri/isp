var model = require("../models");



module.exports = {
  getActive : function (product,cb) {
    model.Order.find({product:{$in:product},endDate:{$gte:new Date()}}).distinct('invoice',function(err, result){
      if(!err){
        cb(result);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  getunActive : function (product,cb) {
    model.Order.find({endDate:{$gte:new Date()}}).distinct('invoice',function(err, ido){
      model.Invoice.find({_id:{$in:ido}}).distinct('invoice',function(err, idin){
        model.Order.find({$and:[{endDate:{$lt:new Date()}},{product:{$in:product}},{invoice:{$nin:idin}}]}).distinct('invoice',function(err, result){
          if(!err){
            cb(result);
          }else{
            console.log(err);
            cb(null);
          }
        });
      });
    });
  },

  getBetween : function (start,end,product,cb) {
    model.Order.find({$and:[{endDate:{$gte: new Date(start)}},{product:{$in:product}},{endDate:{$lt: new Date(end)}}]}).distinct('invoice',function(err, result){
      if(!err){
        cb(result);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  getReseller : function (id,cb) {
    model.Invoice.find({$and:[{reseller:id},{status:1}]},function(err, result){
      if(!err){
        cb(result);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  getInvoices : function (ids,cb){
    model.Invoice.find({$and:[{_id:{$in:ids}},{typein:1},{status:1}]}).populate('customer instock').exec(function(err, result){
      model.Invoice.find({$and:[{_id:{$in:ids}},{typein:3},{status:1}]}).populate('customer invoice').exec(function(err, result2){  
        var options = {
          path: 'invoice.invoice',
          model: 'Invoice'
        };
        if(!err){
          // cb(result);
          model.Invoice.populate(result2, options, function (err, result3) {
            var options = {
              path: 'invoice.instock',
              model: 'Instock'
            };
            model.Invoice.populate(result3, options, function (err, invoice) {
              // console.log(invoice[1].invoice);
              if(!err){
                model.Product.find({type:'package'}).distinct('_id',function(err, result4){
                  model.Order.find({$and:[{invoice:{$in:ids}},{product:{$in:result4}}]}).populate('product').exec(function(err, order){
                    cb({order:order,invoice:invoice,result:result});
                  });
                });
              }else{
                console.log(err);
                cb(null);
              }
              
            });
          });
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },
  getTotalMoney : function (id,cb){
    model.Invoice.find({$and:[{customer:id},{status:1},{typein:{$ne:2}}]},function(err, invoices){
      if(!err){
        cb(invoices);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  getTotalCompany : function (cb){
    model.Invoice.find({$and:[{status:1},{typein:{$ne:2}}]},function(err, invoices){
      if(!err){
        cb(invoices);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  getTotalCompanyReseller : function (id,cb){
    model.Invoice.find({$and:[{status:1},{reseller:id},{typein:{$ne:2}}]},function(err, invoices){
      if(!err){
        console.log(invoices);
        cb(invoices);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  getcompar : function (body,cb) {
    // var result=[];
    // var flag=0;
    // for (i in body){
      var tbody = body[0].split(",");
      var mac = tbody[0];
      var start = tbody[1];
      var end = tbody[2];
      model.Instock.findOne({macAddress:mac}).distinct('invoice',function(err, ido){
        model.Invoice.find({$or:[{_id:ido},{invoice:ido}]}).populate('customer').sort({startDate:-1}).limit(1).exec(function(err,invoice){
        if(!err){
          cb(invoice);
        }else{
          cb(null);
        }
      });
    });
  },
  getProductServes : function (id,cb){
    if(id!=-1){
      var obj={'packages.service':id};
    }else{
      var obj={};
    }
    model.Product.find(obj).distinct('_id',function(err, products){
      if(!err){
        cb(products);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
};