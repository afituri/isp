var express = require('express');
var router = express.Router();
var userHelpers = require('../controller/userHelpers');
var invoiceMgr = require("../controller/invoice");
var reportMgr = require("../controller/report");
var jsreport = require("jsreport");
var fs = require("fs");
var userHelpers = require("../controller/userHelpers");
var path = require("path");
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();


router.post('/restor',userHelpers.isLogin ,multipartyMiddleware,function(req , res){
  var results=[];
  req.body.forEach(function(i) {
    reportMgr.getcompar(i,function(result){
      results.push({invoice:result,tbody:i[0].split(",")});
      if(results.length == req.body.length){
        res.send(results);
      }

    });
  });    
});
router.post('/active',userHelpers.isLogin ,function(req , res){
  var service;
  if(req.body.service){
    service=req.body.service._id
  }else{
    service=-1;
  }
  reportMgr.getProductServes(service,function(product){
    reportMgr.getActive(product,function(results){
      reportMgr.getInvoices(results,function(result){
        pars(result,function(obj){
          res.send(obj);
        });
      });
    });
  });
});

router.get('/printInvoiceGiga/:id',userHelpers.isLogin , function(req, res) {
  invoiceMgr.getInvoicedata(req.params.id,function(result){
    jsreport.render({
      template: { 
        engine: "jsrender",
        recipe: "phantom-pdf",
        content: fs.readFileSync(path.join(__dirname, "../views/reports/invoiceGiga.html"), "utf8"),
        
      },data:{result:result
      }
    }).then(function(resp) {
      resp.stream.pipe(res);
    }).catch(function(e) {
      res.end(e.message);
    });
  });
});
router.get('/printInvoiceshowrep/:id',userHelpers.isLogin , function(req, res) {
  invoiceMgr.getInvoicedata(req.params.id,function(result){
    jsreport.render({
      template: { 
        engine: "jsrender",
        recipe: "phantom-pdf",
        content: fs.readFileSync(path.join(__dirname, "../views/reports/invoicerep.html"), "utf8"),
        
      },data:{result:result
      }
    }).then(function(resp) {
      resp.stream.pipe(res);
    }).catch(function(e) {
      res.end(e.message);
    });
  });
});

router.get('/printInvoicePaid/:id',userHelpers.isLogin , function(req, res) {
    invoiceMgr.getInvoicedata(req.params.id,function(result){
      jsreport.render({
        template: { 
          engine: "jsrender",
          recipe: "phantom-pdf",
          content: fs.readFileSync(path.join(__dirname, "../views/reports/invoicePaid.html"), "utf8"),
          
        },data:{result:result
        }
      }).then(function(resp) {
        resp.stream.pipe(res);
      }).catch(function(e) {
        res.end(e.message);
      });

  });

  });


router.get('/printInvoice/:id',userHelpers.isLogin , function(req, res) {
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


router.get('/printActive/:id',userHelpers.isLogin ,function(req , res){
  var service;
  if(req.params.id!=-1){
    service=req.params.id;
  }else{
    service=-1;
  }
  reportMgr.getProductServes(service,function(product){
    reportMgr.getActive(product,function(results){
      reportMgr.getInvoices(results,function(result){
        pars(result,function(obj){
          obj.active = "المفعلة";
          userHelpers.printReport("active.html",obj,res);
        });
      });
    });
  });
});


router.get('/printunActive/:id',userHelpers.isLogin ,function(req , res){
  var service;
  if(req.params.id!=-1){
    service=req.params.id;
  }else{
    service=-1;
  }
  reportMgr.getProductServes(service,function(product){
    reportMgr.getunActive(product,function(results){
      reportMgr.getInvoices(results,function(result){
        pars(result,function(obj){
          obj.active = "الغير المفعلة";
          userHelpers.printReport("active.html",obj,res);
        });
        
      });
    });
  });
});
router.post('/unactive',userHelpers.isLogin ,function(req , res){
  var service;
  if(req.body.service){
    service=req.body.service._id
  }else{
    service=-1;
  }
  reportMgr.getProductServes(service,function(product){
    reportMgr.getunActive(product,function(results){
      reportMgr.getInvoices(results,function(result){
        pars(result,function(obj){
          res.send(obj);
        });
      });
    });
  });
});

router.get('/money/:id',userHelpers.isLogin ,function(req , res){
  reportMgr.getTotalMoney(req.params.id,function(result){
    parsPiad(result,function(money){
      res.send(money);
    });
  });
});

router.get('/company',userHelpers.isLogin ,function(req , res){
  reportMgr.getTotalCompany(function(result){
    parsPiad(result,function(money){
      res.send(money);
    });
  });
});

router.post('/Between',userHelpers.isLogin ,function(req , res){
  var service;
  if(req.body.service){
    service=req.body.service._id
  }else{
    service=-1;
  }
  reportMgr.getProductServes(service,function(product){
    reportMgr.getBetween(req.body.start,req.body.end,product,function(results){
      reportMgr.getInvoices(results,function(result){
        pars(result,function(obj){
          res.send(obj);
        });
      });
    });
  });
});

router.get('/printBetween/:start/:end/:service',userHelpers.isLogin ,function(req , res){
  var service;
  if(req.body.service){
    service=req.body.service._id
  }else{
    service=-1;
  }
  reportMgr.getProductServes(service,function(product){
    reportMgr.getBetween(req.params.start,req.params.end,product,function(results){
      reportMgr.getInvoices(results,function(result){
        pars(result,function(obj){
          userHelpers.printReport("active.html",obj,res);
        });
      });
    });
  });
});

router.post('/Reseller',userHelpers.isLogin ,function(req , res){
  reportMgr.getReseller(req.body.reseller,function(results){
    reportMgr.getInvoices(results,function(result){
      pars(result,function(obj){
        res.send(obj);
      });
    });
  });
});

router.get('/printReseller/:id',userHelpers.isLogin ,function(req , res){
  reportMgr.getReseller(req.params.id,function(results){
    reportMgr.getInvoices(results,function(result){
      pars(result,function(obj){
        userHelpers.printReport("active.html",obj,res);
      });
    });
  });
});

function pars(result,cb){
  var flag1=0;
  var flag2=0;
  var orderArray=[];
  var obj=[];
  var typeA=['فاتورة','مبدئية','تجديد','دفعة'];
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
    var start='';
    var type='';
    

    if(result.result[i].customer){
      name=result.result[i].customer.name;
    }

    if(result.result[i].instock!=undefined){
      macAddress=result.result[i].instock.macAddress;
    }
    if(orderArray[result.result[i]._id]){
      product=orderArray[result.result[i]._id].name;
    }
    if(result.result[i].customer){
      phone=result.result[i].customer.phone;
    }
    if(result.result[i].startDate){
      // start=result.result[i].startDate;
      start =result.result[i].startDate.getDate()+' / '+parseInt(result.result[i].startDate.getMonth()+1)+' / '+result.result[i].startDate.getFullYear();
    }
    if(result.result[i].typein){
      type=typeA[result.result[i].typein-1];
    }
    if(result.result[i].endDate){
      // end=orderArray[result.result[i]._id].end;
      end=result.result[i].endDate.getDate()+' / '+parseInt(result.result[i].endDate.getMonth()+1)+' / '+result.result[i].endDate.getFullYear();
    }
    obj.push({name:name,macAddress:macAddress,product:product,phone:phone,end:end,start:start,type:type})
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
    var start='';
    var type='';
    if(result.invoice[i].invoice){
      if(result.invoice[i].invoice.customer){
        name=result.invoice[i].customer.name;
      }
    }
    if(result.invoice[i].instock){
      macAddress=result.result[i].instock.macAddress;
    }
    if(orderArray[result.invoice[i]._id]){
      product=orderArray[result.invoice[i]._id].name;
    }
    if(result.invoice[i].customer){
      phone=result.invoice[i].customer.phone;
    }
    if(result.invoice[i].startDate){
      // start=result.invoice[i].startDate;
      start =result.invoice[i].startDate.getDate()+' / '+parseInt(result.invoice[i].startDate.getMonth()+1)+' / '+result.invoice[i].startDate.getFullYear();
    }
    if(result.invoice[i].typein){
      type=typeA[result.invoice[i].typein-1];
    }
    if(result.invoice[i].endDate){
      // end=orderArray[result.invoice[i]._id].end;
      end=result.invoice[i].endDate.getDate()+' / '+parseInt(result.invoice[i].endDate.getMonth()+1)+' / '+result.invoice[i].endDate.getFullYear();
    }
    obj.push({name:name,macAddress:macAddress,product:product,phone:phone,end:end,start:start,type:type})
    if(i == result.invoice.length-1){
      flag2=1;
    } 
  }

  if(flag1&&flag2){
    cb(obj);
  }
}

function parsPiad(result,cb){
  var flag=0;
  var sum=0;
  var piad=0;
  if(result.length==0){
    flag=1;
  }


  for (i in result){
    if(result[i].typein==4){
      piad+=result[i].piad;
    }else{
      sum+=result[i].piad; 
    }
    if(i==result.length-1){
      flag=1;
    }
  }
  
  if(flag){
    cb({sum:sum,piad:piad});
  }
}
module.exports = router;