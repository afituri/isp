var express = require('express');
var router = express.Router();
var data = require('../data/customer');
var customerMgr = require("../controller/customer");
var user = require("../controller/user");
// var jsr = require('jsreport');
// var fs = require("fs");
// var path = require("path");

/* GET all customer */
router.get('/:limit/:page/:status', function(req, res) {
  customerMgr.getCustomer(req.params.status,req.params.limit,req.params.page,function(customers){
    res.send(customers);
  });
});

router.get('/reject/:limit/:page/:status', function(req, res) {
  customerMgr.getCustomerReject(req.session.passport.user,req.params.status,req.params.limit,req.params.page,function(customers){
    res.send(customers);
  });
});
router.get('/all', function(req, res) {
  customerMgr.getAllCustomer(function(customers){
    res.send(customers);
  });
});
/* Add new customer   */
router.post('/add', function(req, res) {
  /*user.register({email:'elamir@naga.ly',password:'12345'},function(customer){
    console.log(customer);
  });*/
  

  console.log(req.session.passport.user);
  //res.send(true);
  req.body.user =null;
  req.body.reseller=null;
  if(req.body.status == 1){
  console.log("here");
  console.log(req.session.passport.user);
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

router.post('/in/:name', function(req, res) {
  customerMgr.getCustomerName(req.params.name,function(customer){
    res.send(customer);
  });
});

// router.get('/report', function(req, res) {
//    jsr.render({
//     template: {
//       content: fs.readFileSync(path.join(__dirname, "../views/pages/invoices/invoice.html"), "utf8"),
//       recipe: "phantom-pdf"
//     },
//     data: {
//       name:"Mr.alla don't forget to design this page !!!"
//     }
//   })
//   .then(function (response) {
//     response.result.pipe(res);
//   });
// });

/* Edit customer  by id  */
router.put('/edit/:id', function(req, res) {
  customerMgr.updateCustomer(req.params.id,req.body,function(customer){
    res.send(customer);
  });
});

//editById
router.put('/editById/:id', function(req, res) {
  customerMgr.updateCustomerById(req.params.id,req.session.passport.user,function(customer){
    res.send(customer);
  });
});

//editRejectById
router.put('/editRejectById/:id', function(req, res) {
  customerMgr.updateRejectCustomer(req.params.id,req.session.passport.user,req.body,function(customer){
    res.send(customer);
  });
});

/* Delete customer  by id  */
router.delete('/delete/:id', function(req, res) {
  customerMgr.deleteCustomer(req.params.id,function(customer){
    res.send({result:customer});
  });
});

/* GET customer  by ID  */
router.get('/:id', function(req, res) {
  // res.send(data.customer);
  customerMgr.getCustomerId(req.params.id,function(customer){
    res.send(customer);
  });
});






module.exports = router;
