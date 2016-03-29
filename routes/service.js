var express = require('express');
var router = express.Router();
var data = require('../data/service');

/* GET all Service */
router.get('/', function(req, res) {
  res.send(data.services);
});

/* Add new Service   */
router.post('/add', function(req, res) {
  console.log(req.body);
});

/* Edit Service  by id  */
router.put('/edit/:id', function(req, res) {
  console.log(req.body)
  console.log(req.params.id);
});

/* Delete Service  by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
});

/* GET Service  by ID  */
router.get('/:id', function(req, res) {
  res.send(data.service);
});


module.exports = router;
