var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var services = null;

module.exports = {

  getPermission: function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Permission.count({status:1},function(err,count){
      model.Permission.find({status:1}).limit(limit).skip(page*limit)
      .exec(function(err, result){
        if(!err){
          cb({result:result,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  addPermission: function(body,cb){
    var objects ={
      name : body.name,
      description : body.description
    }
    delete body.name,body.description;
    var pages=["dollar","resselers","invoice","service","suppliers","serviceProviders","warehouses","instock","productServices","productItems","productPackages","customers","productPolicies","policies"];
    var subpermission =[];
    permission = new model.Permission(objects);
    permission.save(function(err,result){
      if(!err) { 
        for(i in pages){
          body[pages[i]].permission=result._id;
          body[pages[i]].pageName=pages[i];
          subpermsion = new model.Subpermsion(body[pages[i]]);
          subpermsion.save(function(err,result){
          if(!err) { 
            cb(true);
          } else {
            cb(false);
          }
        });

        }
      } else {
        cb(false);
      }
    });
  },

  deletePermission: function(id,cb){
    console.log("iam here");
    console.log(id);
    model.Permission.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2)
      } else {
        console.log(err);
        cb(3);
      }
    });
  },

  getPermissionById: function(id,cb){
      model.Permission.find({_id:id}, function(err,resultPer) {
      if (!err) {
        console.log(resultPer[0].id);
        console.log(resultPer.id);
        model.Subpermsion.find({permission:resultPer[0].id}, function(err,resultSub) {
          if (!err) {
            cb({resultPer:resultPer,resultSub:resultSub})
          } else {
            console.log(err);
            cb(false);
          }
        });
      } else {
        console.log(err);
        cb(false);
      }
    });

  },

  editPermission: function(id,body,cb){
    var objects ={
      name : body.name,
      description : body.description
    }
    console.log(body);
    var pages=["dollar","resselers","invoice","service","suppliers","serviceProviders","warehouses","instock","productServices","productItems","productPackages","customers","productPolicies","policies"];
    var subpermission =[];
      model.Permission.findOneAndUpdate({_id:id}, objects, function(err,result) {
      if (!err) {
        delete body.name,body.description;
        for(i in pages){
         body[pages[i]].pageName=pages[i];
          model.Subpermsion.update({permission:id,pageName:pages[i]}, body[pages[i]], function(err,result) {
      if (!err) {
        console.log(result);
        delete body.name,body.description;
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  }
    } else {
      console.log(err);
      cb(false);
    }
  });

  }
  
  };