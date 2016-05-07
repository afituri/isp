var express = require('express');
var router = express.Router();
var data = require('../data/customer');
var jsr = require('jsreport');
var fs = require("fs");
var path = require("path");
var customerMgr = require("../controller/customer");

/* GET all customer */
router.get('/:limit/:page', function(req, res) {
  customerMgr.getCustomer(req.params.limit,req.params.page,function(customers){
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
  customerMgr.addCustomer(req.body,function(customer){
    res.send(customer);
  });
});

router.post('/in/:name', function(req, res) {
  customerMgr.getCustomerName(req.params.name,function(customer){
    console.log(customer);
    res.send(customer);
  });
});

router.get('/report', function(req, res) {
   jsr.render({
    template: {
      content: fs.readFileSync(path.join(__dirname, "../views/pages/invoices/invoice.html"), "utf8"),
      recipe: "phantom-pdf"
    },
    data: {
      name:"Mr.alla don't forget to design this page !!!"
    }
  })
  .then(function (response) {
    response.result.pipe(res);
  });
});

/* Edit customer  by id  */
router.put('/edit/:id', function(req, res) {
  customerMgr.updateCustomer(req.params.id,req.body,function(customer){
    res.send(customer);
  });
});

/* Delete customer  by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
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
