var express = require('express');
var router = express.Router();
var data = require('../data/sProvider');
var serviceProviderMgr = require("../controller/Serviceprovider");
var servicesMgr = require("../controller/service");
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var fs   = require('fs-extra');

/* GET all Service Providers */
router.get('/',userHelpers.isLogin , function(req, res) {
  serviceProviderMgr.getSProvider(function(SProvider){
    res.send(SProvider.result);
  });
});

/* Add new Service Provider  */
router.post('/add',userHelpers.isLogin , multipartyMiddleware, function(req, res) {
  fs.readFile(req.files.file.path, function (err, data) {
    var newPath = __dirname + "/../public/img/"+req.files.file.originalFilename;
    fs.writeFile(newPath, data, function (err) {
      if(!err){
        req.body.logo= "/../img/"+req.files.file.originalFilename;; 
        serviceProviderMgr.addSProvider(req.body,function(SProvider){
          res.send(SProvider);
        });
      }
      
    });
  });
});

/* Edit Service Provider by id  */
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  serviceProviderMgr.updateSProvider(req.params.id,req.body,function(SProvider){
    res.send(SProvider);
  });
});

/* Delete Service Provider by id  */
router.delete('/delete/:id', userHelpers.isLogin ,function(req, res) {
  serviceProviderMgr.deleteServiceProvider(req.params.id,function(SProvider){
    res.send({result:SProvider});
  });
});

/* GET Service Provider by ID  */
router.get('/:id', userHelpers.isLogin ,function(req, res) {
  serviceProviderMgr.getSProviderId(req.params.id,function(SProvider){
    res.send(SProvider);
  });
});

/* GET All Services belongs to a Service Provider by ID  */
router.get('/:id/services', userHelpers.isLogin ,function(req, res) {
  servicesMgr.getServicesIdProv(req.params.id,function(services){
    res.send(services);
  });
});


module.exports = router;
