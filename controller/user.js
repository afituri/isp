var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")(),
    user = null;
var model = require("../models");


module.exports = {
  getAllUser :function(limit,page,cb){
    page-=1;
    model.User.count({},function(err,count){
      model.User.find({}).limit(limit).skip(page*limit).exec(function(err, users){
        if(!err){
          cb({result:users,count:count});
        }else{
          cb(null);
        }
      });
    });
  },
  getUser :function(username,cb){
    model.User.findOne({email : username}, function(err, user){
      if(!err){
        cb(user);
      }else{
        cb(null);
      }
    });
  },

  getUserId :function(id,cb){
    model.User.findOne({_id : id}, function(err, user){
      if(!err){
        cb(user);
      }else{
        cb(null);
      }
    });
  },
  /* here we add a new user to the system */
  register: function (body, cb) {
    var salt = easyPbkdf2.generateSalt(); //we generate a new salt for every new user
    easyPbkdf2.secureHash( body.password, salt, function( err, passwordHash, originalSalt ) {
      var obj={
        email : body.email,
        password : passwordHash,
        salt : originalSalt,
      };
      user = new model.User(obj);
      user.save(function(err,result){
        if (!err) {
          delete result.password;
          delete result.salt;
          cb(result);
        } else {
          //TODO: return page with errors
          cb(true);
        }
      });
    });
  },


  hasNid: function (nid, cb) {
    model.User.findOne({nid : nid, verified:3}, function(err, user){
      if (!err) {
        if(user){
          cb(user);
        } else {
          cb(false);
        }
      } else {
        cb(null);
      }
    });
  },


  updateUser : function(id,body,cb){
    var obj ={
      name : body.name,
      email : body.email,
      phone : body.phone,
      nid : body.nid
  }
    model.User.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  /* here we add a new user to the system */
  changePassword: function (id, cb) {
    var salt = easyPbkdf2.generateSalt(), //we generate a new salt for every new user
        password = generatePassword(10,false); //we generate a new password for every new user
    easyPbkdf2.secureHash(password, salt, function( err, passwordHash, originalSalt ) {
      var obj={
        password : passwordHash,
        salt : originalSalt,
      };
      model.User.findOne({_id : id}, function(err, user){
        if(!err && user != null){
          user.password = passwordHash;
          user.salt = originalSalt;
          user.save(function(err,result){
            if (!err) {
              delete result.password;
              delete result.salt;
              cb(password);
            } else {
              //return page with errors
              console.log(err)
              cb(null);
            }
          });
        } else {
          cb(null);
        }
      });
    });
  },

  
};



