var express = require('express');
var router = express.Router();
var data = require('../data/customer');
var customerMgr = require("../controller/customer");
var user = require("../controller/user");
var userHelpers = require("../controller/userHelpers");

// var jsr = require('jsreport');
// var fs = require("fs");
// var path = require("path");

/* GET all customer */


router.get('/reject/:limit/:page/:status', userHelpers.isLogin ,function(req, res) {
  customerMgr.getCustomerReject(req.session.passport.user,req.params.status,req.params.limit,req.params.page,function(customers){
    res.send(customers);
  });
});
router.get('/all', userHelpers.isLogin ,function(req, res) {
  customerMgr.getAllCustomer(function(customers){
    res.send(customers);
  });
});



//customerCount

router.get('/customerCount',userHelpers.isLogin , function(req, res) {
  customerMgr.getAllCustomerCount(function(customers){
    res.send(customers);
  });
});
router.get('/customerCountReseller',userHelpers.isLogin , function(req, res) {
  customerMgr.getAllCustomerCountReseller(req.user.id,function(customers){
    res.send(customers);
  });
});
router.get('/res', userHelpers.isLogin ,function(req, res) {
  customerMgr.getAllCustomerRes(req.user._id,function(customers){
    res.send(customers);
  });
});
//allStatus1

router.get('/allStatus1', userHelpers.isLogin ,function(req, res) {
  customerMgr.getAllCustomerStatus(1,function(customers){
    res.send(customers);
  });
});
//0000000
router.get('/customerReseller/:idP/:name/:limit/:page',userHelpers.isLogin , function(req, res) {
  customerMgr.getCustomerReseller(req.user._id,req.params.idP,req.params.name,req.params.limit,req.params.page,function(customers){
    res.send(customers);
  });
});


router.get('/searchAll/:all/:limit/:page', userHelpers.isLogin ,function(req, res) {
  customerMgr.getCustomerSearchAll(req.params.all,req.params.limit,req.params.page,function(customers){
    res.send(customers);
  });
});


/* Add new customer   */
router.post('/add', userHelpers.isLogin ,function(req, res) {
  req.body.user =null;
  req.body.reseller=null;
  if(req.body.status == 1){
  req.body.user = req.session.passport.user;
  customerMgr.addCustomer(req.body,function(customer){
    res.send(customer);
  });
} else {
  req.body.reseller = req.session.passport.user;
  customerMgr.addCustomer(req.body,function(customer){
    res.send(customer);
  });
}
});

router.post('/in/:name',userHelpers.isLogin , function(req, res) {
  customerMgr.getCustomerName(req.params.name,function(customer){
    res.send(customer);
  });
});

/* Edit customer  by id  */
router.put('/edit/:id',userHelpers.isLogin , function(req, res) {
  customerMgr.updateCustomer(req.params.id,req.body,function(customer){
    res.send(customer);
  });
});

//editById
router.put('/editById/:id',userHelpers.isLogin , function(req, res) {
  customerMgr.updateCustomerById(req.params.id,req.session.passport.user,function(customer){
    res.send(customer);
  });
});

//editRejectById
router.put('/editRejectById/:id', userHelpers.isLogin ,function(req, res) {
  customerMgr.updateRejectCustomer(req.params.id,req.session.passport.user,req.body,function(customer){
    res.send(customer);
  });
});

/* Delete customer  by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  customerMgr.deleteCustomer(req.params.id,function(customer){
    res.send({result:customer});
  });
});

/* GET customer  by ID  */
router.get('/:id',userHelpers.isLogin , function(req, res) {
  // res.send(data.customer);
  customerMgr.getCustomerId(req.params.id,function(customer){
    res.send(customer);
  });
});



router.get('/getRe/:limit/:page/:id/:idC/:name/:mac/:idS',userHelpers.isLogin , function(req, res) {
  customerMgr.getCustomerResMAc(req.params.id,req.params.idC,req.params.name,req.params.mac,req.params.idS,req.params.limit,req.params.page,function(customers){
    res.send(customers);
  });
});

router.get('/:limit/:page/:status',userHelpers.isLogin , function(req, res) {
  customerMgr.getCustomer(req.params.status,req.params.limit,req.params.page,function(customers){
    res.send(customers);
  });
});
module.exports = router;
