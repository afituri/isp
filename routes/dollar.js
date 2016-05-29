var express = require('express');
var router = express.Router();
var data = require('../data/warehouse');
var dollarMgr = require("../controller/dollar");
/* GET all doolars */
router.get('/:limit/:page', function(req, res) {
  dollarMgr.getDollar(req.params.limit,req.params.page,function(dollars){
    res.send(dollars);
  });
});
/* GET all doolars whit out pacenation */
router.get('/all', function(req, res) {
  dollarMgr.getAllgetAllDollar(function(dollar){
    res.send(dollar);
  });
});

//lastDollar

router.get('/lastDollar', function(req, res) {
  dollarMgr.getLastDollar(function(dollar){
    res.send(dollar);
  });
});


/* GET last doolar */
router.get('/last', function(req, res) {
  dollarMgr.getLastDollar(function(dollar){
    res.send(dollar);
  });
});
/* Add new dollar  */
router.post('/add', function(req, res) {
  console.log(req.body);
  dollarMgr.addDollar(req.body,function(dollar){
    res.send(dollar);
  });
});

/* Edit dollar by id  */
router.put('/edit/:id', function(req, res) {

  dollarMgr.updateDollar(req.params.id,req.body,function(dollar){
    res.send(dollar);
  });
});
//deleteDollar
router.delete('/delete/:id', function(req, res) {
  dollarMgr.deleteDollar(req.params.id,function(dollar){
    res.send({result:dollar});
  });
});


/* GET dollar by ID  */
router.get('/:id', function(req, res) {
  wareMgr.getDollarId(req.params.id,function(dollar){
    res.send(dollar);
  });
});


module.exports = router;
