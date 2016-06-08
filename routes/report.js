var express = require('express');
var router = express.Router();
var userHelpers = require('../controller/userHelpers');
var invoiceMgr = require("../controller/invoice");
var reportMgr = require("../controller/report");

router.get('/active',function(req , res){
  //res.send({x:1});
  reportMgr.getActive(function(results){
    reportMgr.getInvoices(results,function(result){
      
        /*result المستخدمين الجدد فاتورة جديدة
        invoise  تجديد الاشتراك
        order اسم الخدمة*/
      
      res.send(result);

    });
  });
});

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
      pars(result,function(obj){
        res.send(obj);
      });
    });
  });
});
router.get('/printActive',function(req , res){
  reportMgr.getActive(function(results){
    reportMgr.getInvoices(results,function(result){
      /*
        result المستخدمين الجدد فاتورة جديدة
        invoise  تجديد الاشتراك
        order اسم الخدمة
      */
      pars(result,function(obj){
        userHelpers.printReport("active.html",obj,res);
      });
    });
  });
});
router.get('/printunActive',function(req , res){
  reportMgr.getunActive(function(results){
    reportMgr.getInvoices(results,function(result){
      /*
        result المستخدمين الجدد فاتورة جديدة
        invoise  تجديد الاشتراك
        order اسم الخدمة
      */
      pars(result,function(obj){
        userHelpers.printReport("active.html",obj,res);
      });
      
    });
  });
});
router.get('/unactive',function(req , res){
  reportMgr.getunActive(function(results){
    reportMgr.getInvoices(results,function(result){
      pars(result,function(obj){
        res.send(obj);
      });
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
function pars(result,cb){
  var flag1=0;
  var flag2=0;
  var orderArray=[];
  var obj=[];
  if(result.invoice.length==0){
    flag2=1;
  }
  if(result.result.length==0){
    flag1=1;
  }
  for(i in result.order){
    orderArray[result.order[i].invoice] = {name:result.order[i].product.name,end:result.order[i].endDate};
  }
  for (i in result.result){
    var name = '';
    var macAddress = '';
    var product = '';
    var phone = '';
    var end = '';
    if(result.result[i].customer){
      name=result.result[i].customer.name;
    }
    if(result.result[i].instock){
      macAddress=result.result[i].instock.macAddress;
    }
    if(orderArray[result.result[i]._id]){
      product=orderArray[result.result[i]._id].name;
    }
    if(result.result[i].customer){
      phone=result.result[i].customer.phone;
    }
    if(orderArray[result.result[i]._id]){
      end=orderArray[result.result[i]._id].end;
    }
    obj.push({name:name,macAddress:macAddress,product:product,phone:phone,end:end})
    if(i == result.result.length-1){
      flag1=1;
    } 
  }
  for (i in result.invoice) {
    var name = '';
    var macAddress = '';
    var product = '';
    var phone = '';
    var end = '';
    if(result.invoice[i].customer){
      name=result.invoice[i].customer.name;
    }
    if(result.invoice[i].invoice.instock){
      macAddress=result.result[i].instock.macAddress;
    }
    if(orderArray[result.invoice[i]._id]){
      product=orderArray[result.invoice[i]._id].name;
    }
    if(result.invoice[i].customer){
      phone=result.invoice[i].customer.phone;
    }
    if(orderArray[result.invoice[i]._id]){
      end=orderArray[result.invoice[i]._id].end;
    }
    obj.push({name:result.invoice[i].customer.name,macAddress:result.invoice[i].invoice.instock.macAddress,product:orderArray[result.invoice[i]._id].name,phone:result.invoice[i].customer.phone,end:orderArray[result.invoice[i]._id].end})
    if(i == result.invoice.length-1){
      flag2=1;
    } 
  }

  if(flag1&&flag2){
    cb(obj);
  }
}
module.exports = router;