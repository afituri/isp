var express = require('express');
var router = express.Router();
var data = require('../data/customer');

/* GET all customer */
router.get('/', function(req, res) {
  res.send(data.customers);
});

/* Add new customer   */
router.post('/add', function(req, res) {
  console.log(req.body);
});

/* Edit customer  by id  */
router.put('/edit/:id', function(req, res) {
  console.log(req.body)
  console.log(req.params.id);
});

/* Delete customer  by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
});

/* GET customer  by ID  */
router.get('/:id', function(req, res) {
  res.send(data.customer);
});


module.exports = router;