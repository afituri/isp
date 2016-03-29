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
  console.log(req.body);
  var body ={
    name: req.body.name,
    type:req.body.name,
    discriptoin:req.body.name,
    initialPrice:req.body.name,
    item:null,
    packages:null
  }
  if(type=='item'){
    body['item']={
      made:req.body.name,
      brand:req.body.name
    }
  }else if(type=='package'){
    body['packages']={
      renewPrice:req.body.name,
      GBPrice:req.body.name
    }
  }
  Policy.addPolicy(function(result){
    res.send(result);
  });
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
