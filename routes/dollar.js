var express = require('express');
var router = express.Router();
var data = require('../data/warehouse');
var dollarMgr = require("../controller/dollar");
/* GET all doolars */
router.get('/:limit/:page', function(req, res) {
  wareMgr.getDollar(req.params.limit,req.params.page,function(dollars){
    res.send(dollars);
  });
});
/* GET all doolars whit out pacenation */
router.get('/all', function(req, res) {
  wareMgr.getAllgetAllDollar(function(dollar){
    res.send(dollar);
  });
});
/* GET last doolar */
router.get('/last', function(req, res) {
  wareMgr.getLastDollar(function(dollar){
    res.send(dollar);
  });
});
/* Add new dollar  */
router.post('/add', function(req, res) {
  wareMgr.addDollar(req.body,function(dollar){
    res.send(dollar);
  });
});

/* Edit dollar by id  */
router.put('/edit/:id', function(req, res) {

  wareMgr.updateDollar(req.params.id,req.body,function(dollar){
    res.send(dollar);
  });
});


/* GET dollar by ID  */
router.get('/:id', function(req, res) {
  wareMgr.getDollarId(req.params.id,function(dollar){
    res.send(dollar);
  });
});


module.exports = router;
