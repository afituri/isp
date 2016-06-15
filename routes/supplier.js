var express = require('express');
var router = express.Router();
var data = require('../data/supplier');
var supplierMgr = require("../controller/supplier");

/* GET all suppliers */
router.get('/:limit/:page', function(req, res) {
  // res.send(data.suppliers);
  supplierMgr.getSupplier(req.params.limit,req.params.page,function(supplier){
    res.send(supplier);
  });
});
router.get('/all', function(req, res) {
  // res.send(data.suppliers);
  supplierMgr.getAllSupplier(function(supplier){
    res.send(supplier);
  });
});
//getSuppliersCount
router.get('/getSuppliersCount', function(req, res) {
  // res.send(data.suppliers);
  supplierMgr.getAllSupplierCount(function(supplier){
    res.send(supplier);
  });
});
/* Add new supplier  */
router.post('/add', function(req, res) {
  // console.log(req.body);
  supplierMgr.addSupplier(req.body,function(supplier){
    res.send(supplier);
  });
});

/* Edit supplier by id  */
router.put('/edit/:id', function(req, res) {
  // console.log(req.body);
  // console.log(req.params.id);
  supplierMgr.updateSupplier(req.params.id,req.body,function(supplier){
    res.send(supplier);
  });
});

/* Delete supplier by id  */
router.delete('/delete/:id', function(req, res) {
  supplierMgr.deleteSupplier(req.params.id,function(supplier){
    res.send({result:supplier});
  });
});

/* GET supplier by ID  */
router.get('/:id', function(req, res) {
  // res.send(data.supplier);
  supplierMgr.getSupplierId(req.params.id,function(supplier){
    res.send(supplier);
  });
});


module.exports = router;
