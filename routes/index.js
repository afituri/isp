var express = require('express');
var router = express.Router();
//var login = require('../controller/login')(router);
//var user = require("../controller/user");
reseller = require("../controller/reseller");
var model = require('../models');
var userHelpers = require("../controller/userHelpers");
var data = require("../data/resellers.json");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'شاشة الدخول' });
});

router.get('/home',userHelpers.isLogin ,function(req, res) {
  res.render('index', { title: 'الرئسية' });
});

router.get('/data', function(req, res) {
  res.send(data);
});

module.exports = router;
