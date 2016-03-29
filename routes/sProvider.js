var express = require('express');
var router = express.Router();
var data = require('../data/sProvider');

/* GET all Service Providers */
router.get('/', function(req, res) {
  res.send(data.sProviders);
});

/* Add new Service Provider  */
router.post('/add', function(req, res) {
  console.log(req.body);
});

/* Edit Service Provider by id  */
router.put('/edit/:id', function(req, res) {
  console.log(req.body)
  console.log(req.params.id);
});

/* Delete Service Provider by id  */
router.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
});

/* GET Service Provider by ID  */
router.get('/:id', function(req, res) {
  res.send(data.sProvider);
});


module.exports = router;
