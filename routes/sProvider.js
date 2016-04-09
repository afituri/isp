var express = require('express');
var router = express.Router();
var data = require('../data/sProvider');
var serviceProviderMgr = require("../controller/serviceProvider");
var servicesMgr = require("../controller/service");

/* GET all Service Providers */
router.get('/:limit/:page', function(req, res) {
  // res.send(data.sProviders);
  serviceProviderMgr.getSProvider(req.params.limit,req.params.page,function(SProvider){
    res.send(SProvider);
  });
});

/* Add new Service Provider  */
router.post('/add', function(req, res) {
  // console.log(req.body);
  
  serviceProviderMgr.addSProvider(req.body,function(SProvider){
    res.send(SProvider);
  });
});

/* Edit Service Provider by id  */
router.put('/edit/:id', function(req, res) {
  // console.log(req.body)
  // console.log(req.params.id);
  serviceProviderMgr.updateSProvider(req.params.id,req.body,function(SProvider){
    res.send(SProvider);
  });
});

/* Delete Service Provider by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
});

/* GET Service Provider by ID  */
router.get('/:id', function(req, res) {
  // res.send(data.sProvider);
  console.log("Got here");
  serviceProviderMgr.getSProviderId(req.params.id,function(SProvider){
    console.log(SProvider);
    res.send(SProvider);
  });
});

/* GET All Services belongs to a Service Provider by ID  */
router.get('/:id/services', function(req, res) {
  // res.send(data.services);
  servicesMgr.getServicesIdProv(req.params.id,function(services){
    res.send(services);
  });
});


module.exports = router;
