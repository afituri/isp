var express = require('express');
var router = express.Router();
var data = require('../data/user');

/* GET all users */
router.get('/', function(req, res) {
  res.send(data.users);
});

/* Add new user  */
router.post('/add', function(req, res) {
  console.log(req.body);
});

/* Edit user by id  */
router.put('/edit/:id', function(req, res) {
  console.log(req.body)
  console.log(req.params.id);
});

/* Delete user by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
});

/* GET user by ID  */
router.get('/:id', function(req, res) {
  res.send(data.user);
});


module.exports = router;
