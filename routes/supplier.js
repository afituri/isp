var express = require('express');
var router = express.Router();
var data = require('../data/supplier');

/* GET all suppliers */
router.get('/', function(req, res) {
  res.send(data.suppliers);
});

/* Add new supplier  */
router.post('/add', function(req, res) {
  console.log(req.body);
});

/* Edit supplier by id  */
router.put('/edit/:id', function(req, res) {
  console.log(req.body)
  console.log(req.params.id);
});

/* Delete supplier by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
});

/* GET supplier by ID  */
router.get('/:id', function(req, res) {
  res.send(data.supplier);
});


module.exports = router;
