var express = require('express');
var router = express.Router();
var data = require('../data/service');
var servicesMgr = require("../controller/service");
/* GET all Service */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  // res.send(data.services);
  servicesMgr.getServices(req.params.limit,req.params.page,function(services){
    res.send(services);
  });
});

router.post('/search/:limit/:page', userHelpers.isLogin ,function(req, res) {
  servicesMgr.getServicesSearch (req.body.name,req.params.limit,req.params.page,function(services){
    res.send(services);
  });
});
router.get('/all',userHelpers.isLogin , function(req, res) {
  // res.send(data.services);
  servicesMgr.getAllServices(function(services){
    res.send(services);
  });
});
/* Add new Service   */
router.post('/add', userHelpers.isLogin ,function(req, res) {
  servicesMgr.addServices(req.body,function(services){
    res.send(services);
  });
});

/* Edit Service  by id  */
router.put('/edit/:id',userHelpers.isLogin , function(req, res) {
  servicesMgr.updateServices(req.params.id,req.body,function(services){
    res.send(services);
  });
});

/* Delete Service  by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  servicesMgr.deleteServices(req.params.id,function(services){
    res.send({result:services});
  });
});

/* GET Service  by ID  */
router.get('/:id', userHelpers.isLogin ,function(req, res) {
  // res.send(data.service);
  servicesMgr.getServicesId(req.params.id,function(services){
    res.send(services);
  });
});


module.exports = router;
