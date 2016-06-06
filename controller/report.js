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

  getInvoices : function (ids,cb){
    console.log(ids);
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
                cb({invoice:invoice,result:result});
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