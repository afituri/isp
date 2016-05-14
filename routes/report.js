var express = require('express');
var router = express.Router();
var userHelpers = require('../controller/userHelpers');

router.post('/printInvoice', function(req, res) {
  // userHelpers.printReport("invoice.html",res);
  console.log(req.body);
});

module.exports = router;