var express = require('express');
var router = express.Router();
var userHelpers = require('../controller/userHelpers');
var invoiceMgr = require("../controller/invoice");


router.get('/printInvoice/:id', function(req, res) {
  console.log(req.params.id);
  invoiceMgr.getInvoicedata(req.params.id,function(result){
    console.log(result);
    userHelpers.printReport("invoice.html",result,res);
  });
  
});

module.exports = router;