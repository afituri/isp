var express = require('express');
var router = express.Router();
var userHelpers = require('../controller/userHelpers');
var invoiceMgr = require("../controller/invoice");
var reportMgr = require("../controller/report");

router.get('/printInvoice/:id', function(req, res) {
  invoiceMgr.getInvoicedata(req.params.id,function(result){
    var months;
    var now = new Date();
    var nowdate =now.getDate()+' / '+parseInt(now.getMonth()+1)+' / '+now.getFullYear();
    if(result.invoices.typein!=4){
      months = (result.order[0].endDate.getFullYear() - result.order[0].startDate.getFullYear()) * 12;
      months += result.order[0].endDate.getMonth()-result.order[0].startDate.getMonth() + 1;
      result['months']=months;
      var startDate =result.order[0].startDate.getDate()+' / '+parseInt(result.order[0].startDate.getMonth()+1)+' / '+result.order[0].startDate.getFullYear();
      var endDate =result.order[0].endDate.getDate()+' / '+parseInt(result.order[0].endDate.getMonth()+1)+' / '+result.order[0].endDate.getFullYear();
      console.log(result.order);
      result['nowdate']=nowdate;
      result['startDate']=startDate;
      result['endDate']=endDate; 
      result.product={counter:[1,2,3]};    
    }
    userHelpers.printReport("invoice.html",result,res);

  });
  
});

router.get('/active',function(req , res){
  reportMgr.getActive(function(results){
    reportMgr.getInvoices(results,function(result){
      /*
        result المستخدمين الجدد فاتورة جديدة
        invoise  تجديد الاشتراك
        order اسم الخدمة
      */
      res.send(result);

    });
  });
});

router.get('/unactive',function(req , res){
  reportMgr.getunActive(function(results){
    reportMgr.getInvoices(results,function(result){
      res.send(result);
    });
  });
});

router.post('/Between',function(req , res){
  reportMgr.getBetween(req.body.start,req.body.end,function(results){
    reportMgr.getInvoices(results,function(result){
      res.send(result);
    });
  });
});

router.post('/Reseller',function(req , res){
  reportMgr.getReseller(req.body.reseller,function(results){
    reportMgr.getInvoices(results,function(result){
      res.send(result);
    });
  });
});
module.exports = router;