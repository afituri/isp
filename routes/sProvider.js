var express = require('express');
var router = express.Router();
var data = require('../data/sProvider');
var serviceProviderMgr = require("../controller/Serviceprovider");
var servicesMgr = require("../controller/service");
multiparty = require('connect-multiparty'),
multipartyMiddleware = multiparty();

/* GET all Service Providers */
router.get('/', function(req, res) {
  serviceProviderMgr.getSProvider(function(SProvider){
    res.send(SProvider.result);
  });
});

/* Add new Service Provider  */
router.post('/add', multipartyMiddleware, function(req, res) {  
  console.log(req.files.file);
  console.log(req.body);
  // serviceProviderMgr.addSProvider(req.body,function(SProvider){
  //   res.send(SProvider);
  // });
});

/* Edit Service Provider by id  */
router.put('/edit/:id', function(req, res) {
  serviceProviderMgr.updateSProvider(req.params.id,req.body,function(SProvider){
    res.send(SProvider);
  });
});

/* Delete Service Provider by id  */
router.delete('/delete/:id', function(req, res) {
  serviceProviderMgr.deleteServiceProvider(req.params.id,function(SProvider){
    res.send({result:SProvider});
  });
});

/* GET Service Provider by ID  */
router.get('/:id', function(req, res) {
  serviceProviderMgr.getSProviderId(req.params.id,function(SProvider){
    res.send(SProvider);
  });
});

/* GET All Services belongs to a Service Provider by ID  */
router.get('/:id/services', function(req, res) {
  servicesMgr.getServicesIdProv(req.params.id,function(services){
    res.send(services);
  });
});


module.exports = router;
