var express = require('express');
var router = express.Router();
var data = require('../data/reseller');

/* GET all resellers */
router.get('/', function(req, res) {
  res.send(data.resellers);
});

/* Add new reseller  */
router.post('/add', function(req, res) {
  console.log(req.body);
});

/* Edit reseller by id  */
router.put('/edit/:id', function(req, res) {
  console.log(req.body)
  console.log(req.params.id);
});

/* Delete reseller by id  */
router.delete('/edit/:id', function(req, res) {
  console.log(req.params.id);
});

/* GET reseller by ID  */
router.get('/:id', function(req, res) {
  res.send(data.reseller);
});


module.exports = router;
