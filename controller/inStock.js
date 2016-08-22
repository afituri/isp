var generatePassword = require('password-generator'),
  easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var inStock = null;

module.exports = {
  getInStock :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Instock.count({status:1},function(err,count){
      model.Instock.find({status:1}).limit(limit).skip(page*limit)
      .populate('product')
      .populate('warehouse')
      .exec(function(err, result){
        if(!err){
          cb({result:result,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },
  getInStockTake :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Instock.count({status:2},function(err,count){
      model.Instock.find({status:2}).limit(limit).skip(page*limit)
      .populate('invoice')
      .exec(function(err, result){
        if(!err){
          // console.log(result);
          var options = {
          path: 'invoice.customer',
          model: 'Customer'
        };
        model.Instock.populate(result, options, function (err, result1) {
          if(!err){
             var options = {
              path: 'invoice.reseller',
              model: 'Reseller'
            };
            model.Instock.populate(result1, options, function (err, result2) {
              if(!err){
                cb({result:result2,count:count});    
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
    });
  },
  getInStockId :function(id,cb){
    model.Instock.findOne({_id : id})
    .populate('product')
    .populate('warehouse')
    .exec(function(err, result){
      if(!err){
        cb(result);
      }else{
        cb(null);
      }
    });
  },

  getAllInStock :function(cb){
    model.Instock.find({status:1},function(err, result){
      if(!err){
        cb(result);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  getAllInStockTake :function(cb){
    model.Instock.find({status:2}).populate('invoice')
      .exec(function(err, result){
        if(!err){
          // console.log(result);
          var options = {
          path: 'invoice.customer',
          model: 'Customer'
        };
        model.Instock.populate(result, options, function (err, result1) {
          if(!err){
             var options = {
              path: 'invoice.reseller',
              model: 'Reseller'
            };
            model.Instock.populate(result1, options, function (err, result2) {
              if(!err){
                cb({result:result2,count:count});    
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
  updateInStockInvoice : function(id,itemInfo,cb){
    model.Instock.findOneAndUpdate({$and:[{status:1},{_id:itemInfo}]},{invoice:id,status:2} , function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  searchInStockInvoice :function(id,cb){
    model.Instock.findOne({$and: [ {status:1},{product:id}]}, function(err,result) {
      if (!err) {
        cb(result)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  addInStock: function (body, cb) {
    var obj = body;
    // if(body.type==4){
    //   obj.macAddress=null;
    //   obj.username=null;
    //   obj.password=null;
    // }
    inStock = new model.Instock(obj);
    inStock.save(function(err,result){
      if (!err) {
        cb(true);

      } else {
        //TODO: return page with errors
        console.log(err);
        cb(false);
      }
    });
  },
  updateInStock: function(id,body,cb) {
    var obj = body;
    model.Instock.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  deleteInStock : function(id,cb){
    model.Instock.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2)
      } else {
        console.log(err);
        cb(3);
      }
    });
  },
getByWP :function(idW,idP,cb){
  model.Instock.find({$and: [ {status:1},{product:idP},{warehouse:idW}]}, function(err,result) {
    if (!err) {
      cb(result)
    } else {
      console.log(err);
      cb(false);
    }
  });
},
getByMac :function(txt,cb){
  model.Instock.findOne({$or: [ {macAddress:{$regex:txt, $options:'i'}},{username:{$regex:txt, $options:'i'}}]}, function(err,result) {
    var invoice;
    if(result != null){
      invoice = result.invoice;
    }
    if (!err) {
      model.Invoice.findOne({_id:invoice})
        .populate('customer')
        .populate('reseller')
        .populate('user')
        .exec(function(err, invoice){
          if(!err){
            
            // console.log(result);
            cb({invoice:invoice,mac:result});
          }else{
            console.log(err);
            cb(null);
          }
      });
    } else {
      console.log(err);
      cb(false);
    }
  });
},
getByWare:function(idW,limit,page,cb){
  page = parseInt(page);
  page-=1;
  limit = parseInt(limit);
  
  if(idW==-1){
    var obj={$and: [ {status:1}]};
  }else{
    var obj={$and: [ {status:1},{warehouse:idW}]};
  }
  model.Instock.count(obj,function(err,count){
    model.Instock.find(obj).limit(limit).skip(page*limit)
    .populate('product')
    .populate('warehouse')
    .exec(function(err, result){
      if(!err){
        cb({result:result,count:count});
      }else{
        console.log(err);
        cb(null);
      }
    });
  });
},
transfer : function(body,cb){
  var up ={
    warehouse : body.to,
  }
  for(w in body.obj){
    model.Instock.update({_id:body.obj[w]}, up, function(err,result) {
      if(w == body.obj.length-1){
        if (!err) {
        
          cb(true)
        } else {
          console.log(err);
          cb(false);
        }
  
      }
    });  
  }
  
  },

};