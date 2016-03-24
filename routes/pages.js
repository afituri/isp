var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res) {
  var name = req.params.name;
  res.render('pages/' + name);
});

module.exports = router;