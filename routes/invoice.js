var express = require('express');
var router = express.Router();
var invoiceMgr = require("../controller/invoice");



/* GET all invoice */
router.get('/:limit/:page', function(req, res) {
  invoiceMgr.getInvoice(req.params.limit,req.params.page,function(invoices){
    res.send(invoices);
	});
 });



router.get('/InvoicePending/:limit/:page/:status', function(req, res) {
/*  console.log("gggg");
  res.send(true);*/
  invoiceMgr.getInvoicePending(req.params.status,req.params.limit,req.params.page,function(invoices){
    console.log(invoices);
    res.send(invoices);
  });
 });

router.get('/invoices/:id/:status', function(req, res) {
  invoiceMgr.getInvoicesById(req.params.status,req.params.id,function(invoices){
    res.send(invoices);
  });
});

router.get('/all', function(req, res) {
  invoiceMgr.getAllInvoices(function(result){
    res.send(result);
  });
});
/* Add new invoice   */
router.post('/add', function(req, res) {
  console.log("im in add");
  invoiceMgr.addInvoice(req.body,function(result){
    res.send(result);
  });
});

router.post('/renewInvice', function(req, res) {
  invoiceMgr.renewInvice(req.body,function(result){
    res.send(result);
  });
});

//Pending
router.post('/renewInvicePending', function(req, res) {
  invoiceMgr.renewInvicePending(req.body,function(result){
    res.send(result);
  });
});

router.post('/paidInvoice', function(req, res) {
  invoiceMgr.addPaid(req.body,function(result){
    res.send(result);
  });
});

router.post('/paidInvoicePending', function(req, res) {
  invoiceMgr.addPaidPending(req.body,function(result){
    res.send(result);
  });
});

/* Edit invoice  by id  */
router.put('/edit/:id', function(req, res) {
  invoiceMgr.updateInvoice(req.params.id,req.body,function(result){
    res.send(result);
  });
});

/* Delete invoice  by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
  invoiceMgr.deleteInvoice(req.params.id,function(result){
    res.send({result:result});  
  });
});

module.exports = router;

