var express = require('express');
var router = express.Router();
var login = require('../controller/login')(router);
var user = require("../controller/user");
var reseller = require("../controller/reseller");
var model = require('../models');
var userHelpers = require("../controller/userHelpers");
var city = require('../data/lycities');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'شاشة الدخول' });
});

router.get('/cities',userHelpers.isLogin , function(req, res) {
  res.send(city);
});

router.get('/home',userHelpers.isLogin ,function(req, res) {
  res.render('index', { title: 'الرئسية' });
});

module.exports = router;
