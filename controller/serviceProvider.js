var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var serviceProvider = null;

module.exports = {
  getSProvider :function(cb){
    model.ServiceProvider.find({},function(err, provider){
      if(!err){
        cb(provider);
      }else{
        cb(null);
      }
    });
  },

  getSProviderId :function(id,cb){
    model.ServiceProvider.findOne({_id : id}, function(err, provider){
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
      websit : body.website,
      
     }
    serviceProvider = new model.ServiceProvider(obj);
    serviceProvider.save(function(err,result){
      if (!err) {
        cb(true);

      } else {
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
    model.ServiceProvider.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
};



