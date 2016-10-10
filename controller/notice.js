var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var buyingOrder = null;

module.exports = {

  getNoticeLimit : function(cb){
    model.Notice.find({}).sort({_id:-1}).limit(3).exec(function(err,notice){
        if(!err){
          cb(notice);
        }else{
          console.log(err);
          cb(null);
        }
      });
  },

  addNotice : function(body,cb){
    console.log(body);
    Notice = new model.Notice(body);
    Notice.save(function(err,result){
      if (!err) {
        cb(true);

      } else {
        //TODO: return page with errors
        cb(false);
      }
    });
  },

  getNotice : function(limit,page,cb){
     page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Notice.count({},function(err,count){
      model.Notice.find({}).limit(limit).skip(page*limit).exec(function(err,notice){
        if(!err){
          cb({result:notice,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  deleteNotice: function(id,cb){
    model.Notice.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2)
      } else {
        console.log(err);
        cb(3);
      }
    });
  },



  
};