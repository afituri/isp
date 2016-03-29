var express = require('express');
var router = express.Router();
var data = require('../data/policy');
var Policy = require("../controller/policies");


/* GET all policy */
router.get('/', function(req, res) {
  Policy.getPolicies(function(policies){
    res.send(policies);
  });
});

/* Add new policy   */
router.post('/add', function(req, res) {
  Policy.addPolicy(req.body,function(result){
    res.send(result);
  });
});

/* Edit policy  by id  */
router.put('/edit/:id', function(req, res) {
  // console.log(req.body)
  // console.log(req.params.id);
  
  Policy.updatePolicy(req.params.id,req.body,function(result){
    res.send(result);
  });

});

/* Delete policy  by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
});

/* GET policy  by ID  */
router.get('/:id', function(req, res) {
  Policy.getPolicyId(req.params.id,function(result){
    res.send(result);  
  });
});

/* GET product Policies for policy by ID  */
router.get('/:id/productPolicies', function(req, res) {
  res.send(data.productPolicies);
});


module.exports = router;
