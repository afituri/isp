var express = require('express');
var router = express.Router();
var model = require('../models');
var userHelpers = require("../controller/userHelpers");
var invoiceMgr = require("../controller/invoice");
var invoicePMgr = require("../controller/invoice");


/* GET all invoice */
router.get('/:limit/:page', function(req, res) {
  invoiceMgr.getInvoice(req.params.limit,req.params.page,function(invoices){
    res.send(invoices);
});

router.get('/all', function(req, res) {
  invoiceMgr.getAllInvoices(function(policies){
    res.send(policies);
  });
});
/* Add new invoice   */
router.post('/add', function(req, res) {
  invoiceMgr.addInvoice(req.body,function(result){
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
  invoiceMgr.deleteInvoice(req.params.id,function(result){
    res.send({result:result});  
  });
});

