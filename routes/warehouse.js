var express = require('express');
var router = express.Router();
var data = require('../data/warehouse');
var wareMgr = require("../controller/warehouse");
/* GET all warehouses */
router.get('/:limit/:page', function(req, res) {
  // res.send(data.warehouses);
  wareMgr.getWarehouses(req.params.limit,req.params.page,function(warehouse){
    res.send(warehouse);
  });
});
router.get('/all', function(req, res) {
  // res.send(data.warehouses);
  wareMgr.getAllWarehouses(function(warehouse){
    res.send(warehouse);
  });
});
/* Add new warehouse  */
router.post('/add', function(req, res) {
  // console.log(req.body);
  wareMgr.addWarehouse(req.body,function(warehouse){
    res.send(warehouse);
  });
});

/* Edit warehouse by id  */
router.put('/edit/:id', function(req, res) {
  // console.log(req.body);
  // console.log(req.params.id);
  wareMgr.updateWarehouse(req.params.id,req.body,function(warehouse){
    res.send(warehouse);
  });
});

/* Delete warehouse by id  */
router.delete('/delete/:id', function(req, res) {
  wareMgr.deleteWarehouse(req.params.id,function(warehouse){
    res.send({result:warehouse});
  });
});

/* GET warehouse by ID  */
router.get('/:id', function(req, res) {
  // res.send(data.warehouse);
  wareMgr.getWarehouseId(req.params.id,function(warehouse){
    res.send(warehouse);
  });
});


module.exports = router;
