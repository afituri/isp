var User = require("../models/user"),
    generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")(),
    user = null;


module.exports = {
  /* here we add a new user to the system */
  register: function (body, cb) {
    var salt = easyPbkdf2.generateSalt(); //we generate a new salt for every new user
    easyPbkdf2.secureHash( body.password, salt, function( err, passwordHash, originalSalt ) {
      var obj={
        email : body.email,
        password : passwordHash,
        salt : originalSalt,
      };
      user = new User(obj);
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
    User.findOne({nid : nid, verified:3}, function(err, user){
      if (!err) {
        if(user){
          cb(true);
        } else {
          cb(false);
        }
      } else {
        //TODO: return page with errors
        console.log(err)
        cb(null);
      }
    });
  },
  /* get  */
  verify: function (id, cb) {
    User.findOne({_id : id}, function(err, user){
      if(!err && user != null){
        cb(user);
      } else {
        cb(null);
      }
    });
  },
  
  /* hasEmail  */
  hasEmail: function (email, cb) {
    User.findOne({email : email},'_id', function(err, id){
      if(!err && id != null){
        cb(id);
      } else {
        console.log(err);
        cb(null);
      }
    });
  },
  /* user verifies*/
  enteredData: function (id,body, cb) {
    User.findOne({_id : id}, function(err, user){
      if(!err && user != null){
        user.name = body.name;
        user.nid= body.nid;
        user.save(function(err,result){
          if (!err) {
            delete result.password;
            delete result.salt;
            cb(result);
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
      User.findOne({_id : id}, function(err, user){
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



