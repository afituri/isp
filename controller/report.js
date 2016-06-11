var model = require("../models");



module.exports = {
  getActive : function (cb) {
    model.Order.find({endDate:{$gte:new Date()}}).distinct('invoice',function(err, result){
      if(!err){
        cb(result);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  getunActive : function (cb) {
    model.Order.find({endDate:{$gte:new Date()}}).distinct('invoice',function(err, ido){
      model.Invoice.find({_id:{$in:ido}}).distinct('invoice',function(err, idin){
        model.Order.find({$and:[{endDate:{$lt:new Date()}},{invoice:{$nin:idin}}]}).distinct('invoice',function(err, result){
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

  getBetween : function (start,end,cb) {
    model.Order.find({endDate:{$gte: new Date(start), $lt: new Date(end)}}).distinct('invoice',function(err, result){
      if(!err){
        cb(result);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  getReseller : function (id,cb) {
    console.log("her");
    console.log(id);
    model.Invoice.find({reseller:id},{status:1},function(err, result){
      if(!err){
        cb(result);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  getInvoices : function (ids,cb){
    model.Invoice.find({$and:[{_id:{$in:ids}},{typein:1}]}).populate('customer instock').exec(function(err, result){
      model.Invoice.find({$and:[{_id:{$in:ids}},{typein:3}]}).populate('customer invoice').exec(function(err, result2){  
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

};