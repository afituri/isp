var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var services = null;

module.exports = {
  getServices :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Services.count({},function(err,count){
      model.Services.find({}).limit(limit).skip(page*limit)
      .populate('servicesProvider', 'name')
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
  getAllServices :function(cb){
    model.Services.find({},function(err, services){
      if(!err){
        cb(services);
      }else{
        console.log(err);
        cb(null);
      }
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
      description : body.discriptoin
     }
    services = new model.Services(obj);
    services.save(function(err,result){
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
      servicesProvider : body.servicesProvider,
      description : body.description
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

  deleteServices : function(id,cb){
    model.Services.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2)
      } else {
        console.log(err);
        cb(3);
      }
    });
  },

};