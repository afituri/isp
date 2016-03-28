var express = require('express');
var router = express.Router();
var login = require('../controller/login')(router);
var user = require("../controller/user");
var reseller = require("../controller/reseller");
var model = require('../models');
var userHelpers = require("../controller/userHelpers");
var getResellers = require("../data/getResellers.json");
var getResellerByID = require("../data/getResellerByID.json");
var getServices = require("../data/getServices.json");
var getServiceByID = require("../data/getServiceByID.json");


/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'شاشة الدخول' });
});

router.get('/home',userHelpers.isLogin ,function(req, res) {
  res.render('index', { title: 'الرئسية' });
});

router.get('/getResellers',userHelpers.isLogin , function(req, res) {
  res.send(getResellers);
});

router.post('/getResellerByID',userHelpers.isLogin , function(req, res) {
  res.send(getResellerByID);
});

router.get('/getServices',userHelpers.isLogin , function(req, res) {
  res.send(getServices);
});

router.post('/getServiceByID',userHelpers.isLogin , function(req, res) {
  res.send(getServiceByID);
});

module.exports = router;
