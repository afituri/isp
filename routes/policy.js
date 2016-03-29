var express = require('express');
var router = express.Router();
var data = require('../data/policy');

/* GET all policy */
router.get('/', function(req, res) {
  res.send(data.policies);
});

/* Add new policy   */
router.post('/add', function(req, res) {
  console.log(req.body);
});

/* Edit policy  by id  */
router.put('/edit/:id', function(req, res) {
  console.log(req.body)
  console.log(req.params.id);
});

/* Delete policy  by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
});

/* GET policy  by ID  */
router.get('/:id', function(req, res) {
  res.send(data.policy);
});

/* GET product Policies for policy by ID  */
router.get('/:id/productPolicies', function(req, res) {
  res.send(data.productPolicies);
});


module.exports = router;