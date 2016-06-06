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
      var startDate =result.order[0].startDate.getDate()+' / '+parseInt(result.order[0].startDate.getMonth()+1)+' / '+result.order[0].startDate.getFullYear();
      var endDate =result.order[0].endDate.getDate()+' / '+parseInt(result.order[0].endDate.getMonth()+1)+' / '+result.order[0].endDate.getFullYear();
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
      var orderArray=[];
      for(i in result.order){
        orderArray[result.order[i].invoice] = result.order[i].product.name;
        if(i==result.order.length-1){
          console.log(orderArray);
        //   delete result.order;
        //   result.order=orderArray;
          res.send(orderArray);
        }
      }
    });
  });
});
module.exports = router;