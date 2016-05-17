var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var serviceProvider = null;

module.exports = {
  getSProvider :function(cb){
    // page = parseInt(page);
    // page-=1;
    // limit = parseInt(limit);
    model.Serviceprovider.count({},function(err,count){
      model.Serviceprovider.find({}).exec(function(err, provider){
        if(!err){
          cb({result:provider,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getSProviderId :function(id,cb){
    model.Serviceprovider.findOne({_id : id}, function(err, provider){
      if(!err){
        cb(provider);
      }else{
        cb(null);
      }
    });
  },
  
  addSProvider : function(body,cb){
    var obj ={
      name : body.name,
      email : body.email,
      phone : body.phone,
      logo : body.logo,
      website : body.website,
      
     }
    serviceProvider = new model.Serviceprovider(obj);
    serviceProvider.save(function(err,result){
      if (!err) {
        cb(true);

      } else {
        console.log(err);
        //TODO: return page with errors
        cb(false);
      }
    });
  },
  updateSProvider : function(id,body,cb){
    var obj ={
      name : body.name,
      email : body.email,
      phone : body.phone,
      logo : body.logo,
      websit : body.websit,
      
     }
    model.Serviceprovider.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  deleteServiceProvider : function(id,cb){
    model.Service.find({Serviceprovider:id}, function(err,resultServices) {
      if(resultServices.length > 0){
        cb(1)
      } else{
        model.Serviceprovider.remove({_id:id}, function(err,result) {
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
  
};