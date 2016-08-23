var express = require('express');
var router = express.Router();
var userHelpers = require("../controller/userHelpers");
var permissionMgr = require("../controller/permission");



// permission CRUD
router.route('/')
  .post(function(req, res) {
    permissionMgr.addPermission(req.body,function(result){
      res.send(result);
    });  
  })
  .get(function(req, res) {
    permissionMgr.getAllPermission(function(result){
      console.log(result);
      res.send(result);
    });  
  })
router.route('/getSubPermission')
  .get(function(req,res){
    permissionMgr.getSubPermissionById(req.user.permission,function(result){
      res.send(result);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    permissionMgr.getPermissionById(req.params.id,function(result){
   
      res.send({result:result});
    })
  })
  .delete(function(req, res) {
    permissionMgr.deletePermission(req.params.id,function(result){
      res.send({result:result});
    });
  })
  .put(function(req, res) {
    permissionMgr.editPermission(req.params.id,req.body,function(result){
      res.send(result);
    });
  });

router.route('/:limit/:page')
  .get(function(req, res) {
    permissionMgr.getPermission(req.params.limit,req.params.page,function(result){  
      res.send(result);
    });
  }); 

  



module.exports = router;