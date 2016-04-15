var express = require('express');
var router = express.Router();
var data = require('../data/user');
var userMgr = require("../controller/user");

/* GET all users */
router.get('/:limit/:page', function(req, res) {
  userMgr.getCustomer(req.params.limit,req.params.page,function(users){
    res.send(users);
  });
});
router.get('/all', function(req, res) {
  userMgr.getAllCustomer(function(users){
    res.send(users);
  });
});

/* Add new user  */
router.post('/add', function(req, res) {
  // console.log(req.body);
  userMgr.register(req.body,function(user){
    res.send(user);
  });
  
});

/* Edit user by id  */
router.put('/edit/:id', function(req, res) {
  // console.log(req.body)
  // console.log(req.params.id);
  userMgr.updateUser(req.params.id,req.body,function(user){
    res.send(user);
  });
});

/* Delete user by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
  
});

/* GET user by ID  */
router.get('/:id', function(req, res) {
  // res.send(data.user);
  userMgr.getUserId(req.params.id,function(user){
    res.send(user);
  });
});


module.exports = router;
