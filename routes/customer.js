var express = require('express');
var router = express.Router();
var data = require('../data/customer');
var customerMgr = require("../controller/customer");

/* GET all customer */
router.get('/:limit/:page', function(req, res) {
  customerMgr.getCustomer(req.params.limit,req.params.page,function(customers){
    res.send(customers);
  });
});

/* Add new customer   */
router.post('/add', function(req, res) {
  customerMgr.addCustomer(req.body,function(customer){
    res.send(customer);
  });
});

/* Edit customer  by id  */
router.put('/edit/:id', function(req, res) {
  // console.log(req.body)
  // console.log(req.params.id);
  customerMgr.updateCustomer(req.params.id,req.body,function(customer){
    res.send(customer);
  });
});

/* Delete customer  by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
});

/* GET customer  by ID  */
router.get('/:id', function(req, res) {
  // res.send(data.customer);
  customerMgr.getCustomerId(req.params.id,function(customer){
    res.send(customer);
  });
});


module.exports = router;
