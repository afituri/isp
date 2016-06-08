var express = require('express');
var router = express.Router();
var userHelpers = require('../controller/userHelpers');
var invoiceMgr = require("../controller/invoice");
var reportMgr = require("../controller/report");

router.get('/printInvoice/:id', function(req, res) {
  invoiceMgr.getInvoicedata(req.params.id,function(result){
    var months;
    result['months']=months;
    var now = new Date();
    var nowdate =now.getDate()+' / '+parseInt(now.getMonth()+1)+' / '+now.getFullYear();
    if(result.invoices.typein!=4){
      months = (result.order[0].endDate.getFullYear() - result.order[0].startDate.getFullYear()) * 12;
      months += result.order[0].endDate.getMonth()-result.order[0].startDate.getMonth() + 1;
      var startDate ='';
      var endDate='';
      if(parseInt(result.order[0].startDate.getDate())<9){
        startDate+='0'+result.order[0].startDate.getDate();
      }else{
        startDate+=result.order[0].startDate.getDate();
      }

      if(parseInt(result.order[0].startDate.getMonth()+1)<9){
        startDate+=' / 0'+parseInt(result.order[0].startDate.getMonth()+1);
      }else{
        startDate+=' / '+parseInt(result.order[0].startDate.getMonth()+1);
      }
      if(parseInt(result.order[0].endDate.getDate())<9){
        endDate+='0'+result.order[0].endDate.getDate();
      }else{
        endDate+=result.order[0].endDate.getDate();
      }

      if(parseInt(result.order[0].endDate.getMonth()+1)<9){
        endDate+=' / 0'+parseInt(result.order[0].endDate.getMonth()+1);
      }else{
        endDate+=' / '+parseInt(result.order[0].endDate.getMonth()+1);
      }
      startDate +=' / '+result.order[0].startDate.getFullYear();
      endDate +=' / '+result.order[0].endDate.getFullYear();
      result['nowdate']=nowdate;
      result['startDate']=startDate;
      result['endDate']=endDate;    
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