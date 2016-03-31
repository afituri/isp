var express = require('express');
var router = express.Router();
var data = require('../data/user');

/* GET all users */
router.get('/', function(req, res) {
  User.getCustomer(function(users){
    res.send(users);
  });
});

/* Add new user  */
router.post('/add', function(req, res) {
  // console.log(req.body);
  User.register(req.body,function(user){
    res.send(user);
  });
  
});

/* Edit user by id  */
router.put('/edit/:id', function(req, res) {
  // console.log(req.body)
  // console.log(req.params.id);
  User.updateUser(req.params.id,req.body,function(user){
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
  User.getUserId(req.params.id,function(user){
    res.send(user);
  });
});


module.exports = router;
