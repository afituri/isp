var express = require('express');
var router = express.Router();
var invoiceMgr = require("../controller/invoice");
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var fs   = require('fs-extra');


/* GET all invoice */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  invoiceMgr.getInvoice(req.params.limit,req.params.page,function(invoices){
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


router.post('/paidInvoice',userHelpers.isLogin ,multipartyMiddleware, function(req, res) {
  if(req.body.monoyStatus==2){
    invoiceMgr.addPaid(req.body,function(result){
      var dir = './Check/';
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      var dir = './Check/'+result._id;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      fs.readFile(req.files.file.path, function (err, data) {
        var newPath = __dirname + "/."+dir+'/'+req.files.file.originalFilename;
        fs.writeFile(newPath, data, function (err) {
          if(!err){
            invoiceMgr.updateInvoice(result._id,{path:dir+'/'+req.files.file.originalFilename},function(result1){
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

module.exports = router;

