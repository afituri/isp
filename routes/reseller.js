var express = require('express');
var router = express.Router();
var data = require('../data/reseller');
var resellerMgr = require("../controller/reseller");

/* GET all resellers */
router.get('/', function(req, res) {
  // res.send(data.resellers);
  resellerMgr.getAllReseller(function(reseller){
    res.send(reseller);
  });
});

/* Add new reseller  */
router.post('/add', function(req, res) {
  // console.log(req.body);
  resellerMgr.addReseller(req.body,function(reseller){
    res.send(reseller);
  });
});

/* Edit reseller by id  */
router.put('/edit/:id', function(req, res) {
  // console.log(req.body);
  // console.log(req.params.id);
  resellerMgr.updateReseller(req.params.id,req.body,function(reseller){
    res.send(reseller);
  });
});

/* Delete reseller by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
});

/* GET reseller by ID  */
router.get('/:id', function(req, res) {
  // res.send(data.reseller);
  resellerMgr.getResellerId(req.params.id,function(reseller){
    res.send(reseller);
  });
});


module.exports = router;
