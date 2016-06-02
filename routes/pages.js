var express = require('express');
var router = express.Router();
var model = require('../models');
var userHelpers = require("../controller/userHelpers");

router.get('/:name',userHelpers.isLogin , function(req, res) {
  var name = req.params.name;
  res.render('pages/' + name);
});

router.get('/:folder/:name',userHelpers.isLogin , function(req, res) {
  var folder = req.params.folder;
  var name = req.params.name;
  res.render('pages/' + folder + '/' + name);
});

router.get('/reseller/all/:name',userHelpers.isLogin , function(req, res) {
  var name = req.params.name;
  res.render('reseller/' + name);
});

module.exports = router;