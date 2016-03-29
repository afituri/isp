var express = require('express');
var router = express.Router();
var data = require('../data/warehouse');

/* GET all warehouses */
router.get('/', function(req, res) {
  res.send(data.warehouses);
});

/* Add new warehouse  */
router.post('/add', function(req, res) {
  console.log(req.body);
});

/* Edit warehouse by id  */
router.put('/edit/:id', function(req, res) {
  console.log(req.body)
  console.log(req.params.id);
});

/* Delete warehouse by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
});

/* GET warehouse by ID  */
router.get('/:id', function(req, res) {
  res.send(data.warehouse);
});


module.exports = router;
