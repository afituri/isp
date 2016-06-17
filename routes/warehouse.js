var express = require('express');
var router = express.Router();
var data = require('../data/warehouse');
var wareMgr = require("../controller/warehouse");
var userHelpers = require("../controller/userHelpers");

/* GET all warehouses */
router.get('/:limit/:page', userHelpers.isLogin ,function(req, res) {
  // res.send(data.warehouses);
  wareMgr.getWarehouses(req.params.limit,req.params.page,function(warehouse){
    res.send(warehouse);
  });
});
router.get('/all', userHelpers.isLogin ,function(req, res) {
  // res.send(data.warehouses);
  wareMgr.getAllWarehouses(function(warehouse){
    res.send(warehouse);
  });
});
/* Add new warehouse  */
router.post('/add', userHelpers.isLogin ,function(req, res) {
  wareMgr.addWarehouse(req.body,function(warehouse){
    res.send(warehouse);
  });
});

/* Edit warehouse by id  */
router.put('/edit/:id',userHelpers.isLogin , function(req, res) {
  wareMgr.updateWarehouse(req.params.id,req.body,function(warehouse){
    res.send(warehouse);
  });
});

/* Delete warehouse by id  */
router.delete('/delete/:id', userHelpers.isLogin ,function(req, res) {
  wareMgr.deleteWarehouse(req.params.id,function(warehouse){
    res.send({result:warehouse});
  });
});

/* GET warehouse by ID  */
router.get('/:id', userHelpers.isLogin ,function(req, res) {
  // res.send(data.warehouse);
  wareMgr.getWarehouseId(req.params.id,function(warehouse){
    res.send(warehouse);
  });
});


module.exports = router;
