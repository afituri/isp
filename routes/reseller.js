var express = require('express');
var router = express.Router();
var data = require('../data/reseller');
var resellerMgr = require("../controller/reseller");
var invoiceMgr = require("../controller/invoice");
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var userHelpers = require("../controller/userHelpers");

var fs   = require('fs-extra');
/* GET all resellers */


/* GET search resellers */
router.post('/search/:limit/:page', userHelpers.isLogin ,function(req, res) {
  resellerMgr.getResellerByName(req.body.name,req.params.limit,req.params.page,function(reseller){
    res.send(reseller);
  });
});



router.get('/all', userHelpers.isLogin ,function(req, res) {
  // res.send(data.resellers);
  resellerMgr.getAllReseller(function(reseller){
    res.send(reseller);
  });
});

router.get('/getAllResellersCount', userHelpers.isLogin ,function(req, res) {
  resellerMgr.getAllResellerCount(function(reseller){
    res.send(reseller);
  });
});


/* Add new reseller  */
router.post('/add',userHelpers.isLogin , function(req, res) {
  resellerMgr.addReseller(req.body,function(reseller){
    res.send(reseller);
  });
});

/* Edit reseller by id  */
router.put('/edit/:id',userHelpers.isLogin , function(req, res) {
  resellerMgr.updateReseller(req.params.id,req.body,function(reseller){
    res.send(reseller);
  });
});

/* Delete reseller by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  resellerMgr.deleteReseller(req.params.id,function(reseller){
    res.send({result:reseller});
  });
});

/* GET reseller by ID  */
router.get('/:id', userHelpers.isLogin ,function(req, res) {
  // res.send(data.reseller);
  resellerMgr.getResellerId(req.params.id,function(reseller){
    res.send(reseller);
  });
});

router.post('/addInvoice', userHelpers.isLogin ,function(req, res) {
  resellerMgr.addInvoice(req.body,req.user._id,function(result){
    res.send(result);
  });
});

router.post('/renewInvice', userHelpers.isLogin ,function(req, res) {
  resellerMgr.renewInvice(req.body,req.user._id,function(result){
    res.send(result);
  });
});

router.post('/paidInvoice',userHelpers.isLogin , multipartyMiddleware,function(req, res) {
  if(req.body.monoyStatus==2){
    resellerMgr.addPaid(req.body,req.user._id,function(result){
      var dir = './public/CheckR/';
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      var dir = './public/CheckR/'+result._id;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      fs.readFile(req.files.file.path, function (err, data) {
        var newPath = dir+'/'+req.files.file.originalFilename;
        fs.writeFile(newPath, data, function (err) {
          if(!err){
            invoiceMgr.updateInvoice(result._id,{path:'CheckR/'+result._id+'/'+req.files.file.originalFilename},function(result1){
              res.send(result);
            });
          }
          
        });
      });
    });
  }else{
    resellerMgr.addPaid(req.body,req.user._id,function(result){
      res.send(result);
    });
  }
  // resellerMgr.addPaid(req.body,req.user._id,function(result){
  //   res.send(result);
  // });
});
router.get('/:limit/:page', userHelpers.isLogin ,function(req, res) {
  // res.send(data.resellers);
  resellerMgr.getReseller(req.params.limit,req.params.page,function(reseller){
    res.send(reseller);
  });
});
module.exports = router;
