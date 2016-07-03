var express = require('express');
var router = express.Router();
var invoiceMgr = require("../controller/invoice");
var customerMgr = require("../controller/customer");
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var fs   = require('fs-extra');
var userHelpers = require("../controller/userHelpers");
// var parse = require('csv-parse');
// require('should');




router.get('/invoicesdata/:id', userHelpers.isLogin ,function(req, res) {
  invoiceMgr.getInvoicedata(req.params.id,function(invoices){
    days=(new Date(invoices.invoices.endDate)-new Date(invoices.invoices.startDate))/(1000*60*60*24);
    invoices["days"]=Math.round(days);
    daysN=(new Date(invoices.invoices.endDate)-new Date())/(1000*60*60*24);
    invoices["daysN"]=Math.round(daysN);
    for(i in invoices.order){
      if(invoices.order[i].product.type=="package"){
        var price = invoices.order[i].price/days;
        invoices["price"]=price;
      }
      if(i == invoices.order.length-1){
        res.send(invoices);  
      }
      
    }
    
  });
});
/* GET all invoice */




router.get('/searchAll/:limit/:page/:all',userHelpers.isLogin , function(req, res) {
  customerMgr.getCustomerSearch(req.params.all,req.params.limit,req.params.page,function(invoices){
    res.send(invoices);
  });
 });

//searchForProduct
router.get('/searchForProduct/all/:id',userHelpers.isLogin , function(req, res) {
  invoiceMgr.getProductMack(req.params.id,function(invoices){
    res.send(invoices);
  });
 });



router.get('/InvoicePending/:limit/:page/:status', userHelpers.isLogin ,function(req, res) {
  invoiceMgr.getInvoicePending(req.params.status,req.params.limit,req.params.page,function(invoices){
    res.send(invoices);
  });
 });

router.get('/InvoicePendingRes/:limit/:page/:status',userHelpers.isLogin , function(req, res) {
  invoiceMgr.getInvoicePendingRes(req.params.status,req.user._id,req.params.limit,req.params.page,function(invoices){
    res.send(invoices);
  });
 });

router.get('/invoices/:id/:status', userHelpers.isLogin ,function(req, res) {
  invoiceMgr.getInvoicesById(req.params.status,req.params.id,function(invoices){
    res.send(invoices);
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res) {
  invoiceMgr.getAllInvoices(function(result){
    res.send(result);
  });
});


/* Add new invoice   */
router.post('/add',userHelpers.isLogin , function(req, res) {
  invoiceMgr.addInvoice(req.body,function(result){
    res.send(result);
  });
});

router.post('/renewInvice',userHelpers.isLogin , function(req, res) {
  invoiceMgr.renewInvice(req.body,function(result){
    res.send(result);
  });
});

router.post('/upInvice',userHelpers.isLogin , function(req, res) {
  
  invoiceMgr.updateInvoice(req.body.idCu,{endDate:new Date(),status:1},function(result){
    invoiceMgr.renewInvice(req.body,function(result){
      res.send(result);
    });
  });
});
router.post('/paidInvoice',userHelpers.isLogin ,multipartyMiddleware, function(req, res) {
  if(req.body.monoyStatus==2){
    invoiceMgr.addPaid(req.body,function(result){
      var dir = './public/CheckA/';
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      var dir = './public/CheckA/'+result._id;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      fs.readFile(req.files.file.path, function (err, data) {
        var newPath = dir+'/'+req.files.file.originalFilename;
        fs.writeFile(newPath, data, function (err) {
          if(!err){
            invoiceMgr.updateInvoice(result._id,{path:'CheckA/'+result._id+'/'+req.files.file.originalFilename},function(result1){
              res.send(result);
            });
          }
          
        });
      });
    });
  }else{
    invoiceMgr.addPaid(req.body,function(result){
      res.send(result);
    });
  }
});



/* Edit invoice  by id  */
router.put('/edit/:id',userHelpers.isLogin , function(req, res) {
  req.body.user=req.user._id;
  invoiceMgr.updateInvoice(req.params.id,req.body,function(result){
    res.send(result);
  });
});

/* Delete invoice  by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  invoiceMgr.deleteInvoice(req.params.id,function(result){
    res.send({result:result});  
  });
});
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  invoiceMgr.getInvoice(req.params.limit,req.params.page,function(invoices){
    res.send(invoices);
  });
 });
module.exports = router;

