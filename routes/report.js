var express = require('express');
var router = express.Router();
var userHelpers = require('../controller/userHelpers');


router.get('/printInvoice', function(req, res) {
  userHelpers.printReport("invoice.html",res);
});

module.exports = router;