var express = require('express');
var router = express.Router();
var data = require('../data/service');
var servicesMgr = require("../controller/service");
/* GET all Service */
router.get('/', function(req, res) {
  // res.send(data.services);
  servicesMgr.getServices(function(services){
    res.send(services);
  });
});

/* Add new Service   */
router.post('/add', function(req, res) {
  servicesMgr.addServices(req.body,function(services){
    res.send(services);
  });
});

/* Edit Service  by id  */
router.put('/edit/:id', function(req, res) {
  // console.log(req.body)
  // console.log(req.params.id);
  servicesMgr.updateServices(req.params.id,req.body,function(services){
    res.send(services);
  });
});

/* Delete Service  by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
});

/* GET Service  by ID  */
router.get('/:id', function(req, res) {
  // res.send(data.service);
  servicesMgr.getServicesId(req.params.id,function(services){
    res.send(services);
  });
});


module.exports = router;
