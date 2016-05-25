var generatePassword = require('password-generator'),
  easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var dollar = null;

module.exports = {
  getLastDollar: function(cb){
    model.Dollar.find({}).sort({_id:-1}).limit(1).exec(function(err,dollar){
      if(!err){
        cb({result:dollar,count:count});
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  getDollar :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Dollar.count({},function(err,count){
      model.Dollar.find({}).limit(limit).skip(page*limit).exec(function(err,dollar){
        if(!err){
          cb({result:dollar,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllDollar :function(cb){
    model.Policy.find({},function(err,Dollar){
      if(!err){
        cb(Dollar);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  getDollarId :function(id,cb){
    model.Dollar.findOne({_id : id}, function(err, Dollar){
      if(!err){
        cb(Dollar);
      }else{
        cb(null);
      }
    });
  },
  
  addDollar : function(body,cb){
    var obj =body;
    dollar = new model.Dollar(obj);
    dollar.save(function(err,result){
      if (!err) {
        cb(true);

      } else {
        //TODO: return page with errors
        cb(false);
      }
    });
  },
  updateDollar : function(id,body,cb){
    var obj =body;
    model.Dollar.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

};