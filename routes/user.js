var express = require('express');
var router = express.Router();
var data = require('../data/user');
var userMgr = require("../controller/user");

/* GET all users */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  userMgr.getAllUser(req.params.limit,req.params.page,function(users){
    res.send(users);
  });
});
router.get('/all', userHelpers.isLogin ,function(req, res) {
  userMgr.getAllCustomer(function(users){
    res.send(users);
  });
});

/* Add new user  */
router.post('/add', userHelpers.isLogin ,function(req, res) {
  userMgr.register(req.body,function(user){
    res.send(user);
  });
  
});

/* Edit user by id  */
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  userMgr.updateUser(req.params.id,req.body,function(user){
    res.send(user);
  });
});

/* Delete user by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  // don't forget break the session and logout
  userMgr.deleteUser(req.params.id,function(result){
    res.send({result:result});
  });
});

/* GET user by ID  */
router.get('/:id',userHelpers.isLogin , function(req, res) {
  // res.send(data.user);
  userMgr.getUserId(req.params.id,function(user){
    res.send(user);
  });
});


module.exports = router;
