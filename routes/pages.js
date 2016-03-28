var express = require('express');
var router = express.Router();
var model = require('../models');
var userHelpers = require("../controller/userHelpers");


router.get('/:name',userHelpers.isLogin , function(req, res) {
  var name = req.params.name;
  res.render('pages/' + name);
});

module.exports = router;