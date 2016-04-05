var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var services = null;

module.exports = {
  getServices :function(limit,page,cb){
    page-=1;
    model.Services.count({},function(err,count){
      model.Services.find({}).limit(limit).skip(page*limit).exec(function(err, services){
        if(!err){
          cb({result:services,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  getServicesId :function(id,cb){
    model.Services.findOne({_id : id}, function(err, services){
      if(!err){
        cb(services);
      }else{
        cb(null);
      }
    });
  },
  getServicesIdProv :function(id,cb){
    model.Services.find({servicesProvider : id}, function(err, services){
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
      servicesProvider : body.servicesProvider,
      discriptoin : body.discriptoin
     }
    services = new model.Services(obj);
    services.save(function(err,result){
      if (!err) {
        cb(true);

      } else {
        //TODO: return page with errors
        cb(false);
      }
    });
  },
  updateServices : function(id,body,cb){
    var obj ={
      name : body.name,
      servicesProvider : body.servicesProvider,
      discriptoin : body.discriptoin
     }
    model.Services.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
};


