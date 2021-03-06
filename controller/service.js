var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var services = null;

module.exports = {
  getServices :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Service.count({},function(err,count){
      model.Service.find({}).limit(limit).skip(page*limit)
      .populate('serviceprovider')
      .exec(function(err, services){
        if(!err){
          cb({result:services,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },
  
  getServicesSearch :function(name,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Service.count({"name" : { '$regex' : name, $options: '-i' }},function(err,count){
      model.Service.find({"name" : { '$regex' : name, $options: '-i' }}).limit(limit).skip(page*limit)
      .populate('serviceprovider')
      .exec(function(err, services){
        if(!err){
          cb({result:services,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },



  getCustomerByService : function(id,cb){    
    model.Product.find({'packages.service':id}).distinct('_id',function(err, products){
      if(!err){
       /* console.log(products);
        cb(products);*/
        // another collections
      console.log(products);
      model.Order.find({product:{$in:products}}).distinct('invoice',function(err, order){
        if(!err){
          /*console.log(order);
          cb(products);*/
      console.log(order);
      model.Invoice.find({_id:{$in:order}})
      .populate('customer')
      .exec(function(err, invoice){
      
        if(!err){
          console.log(invoice);
          cb(invoice);
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



  getAllServices :function(cb){
    model.Service.find({},function(err, services){
      if(!err){
        cb(services);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  getServicesId :function(id,cb){
    model.Service.findOne({_id : id}, function(err, services){
      if(!err){
        cb(services);
      }else{
        cb(null);
      }
    });
  },
  getServicesIdProv :function(id,cb){
    model.Service.find({servicesProvider : id}, function(err, services){
      if(!err){
        cb(services);
      }else{
        cb(null);
      }
    });
  },
  addServices : function(body,cb){
    var obj ={
      name : body.name,
      serviceprovider : body.Serviceprovider,
      description : body.description
     }
    service = new model.Service(obj);
    service.save(function(err,result){
      console.log(err);
      if (!err) {
        cb(true);

      } else {
        console.log(err);
        //TODO: return page with errors
        cb(false);
      }
    });
  },
  updateServices : function(id,body,cb){
    var obj ={
      name : body.name,
      serviceprovider : body.serviceprovider,
      description : body.description
     }
   /* console.log(obj);*/
    model.Service.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  deleteServices : function(id,cb){
    model.Service.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2);
      } else {
        console.log(err);
        cb(3);
      }
    });
  },

};