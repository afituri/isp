var express = require('express');
var router = express.Router();
var userHelpers = require('../controller/userHelpers');
var invoiceMgr = require("../controller/invoice");


router.get('/printInvoice/:id', function(req, res) {
  invoiceMgr.getInvoicedata(req.params.id,function(result){
    var months;
    months = (result.order[0].endDate.getFullYear() - result.order[0].startDate.getFullYear()) * 12;
    months += result.order[0].endDate.getMonth()-result.order[0].startDate.getMonth() + 1;
    result['months']=months;
    var now = new Date();
    var nowdate =now.getDate()+' / '+parseInt(now.getMonth()+1)+' / '+now.getFullYear();
    var startDate =result.order[0].startDate.getDate()+' / '+parseInt(result.order[0].startDate.getMonth()+1)+' / '+result.order[0].startDate.getFullYear();
    var endDate =result.order[0].endDate.getDate()+' / '+parseInt(result.order[0].endDate.getMonth()+1)+' / '+result.order[0].endDate.getFullYear();
    result['nowdate']=nowdate;
    result['startDate']=startDate;
    result['endDate']=endDate;
    console.log(result);
    userHelpers.printReport("invoice.html",result,res);
  });
  
});

module.exports = router;