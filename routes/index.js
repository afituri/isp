var express = require('express');
var router = express.Router();
var login = require('../controller/login')(router);
var user = require("../controller/user");
var reseller = require("../controller/reseller");
var model = require('../models');
var userHelpers = require("../controller/userHelpers");
var getResellers = require("../data/getResellers.json");
var getResellerByID = require("../data/getResellerByID.json");
var getServiceProviders = require("../data/getServiceProviders.json");
var getServiceProviderByID = require("../data/getServiceProviderByID.json");
var getServices = require("../data/getServices.json");
var getServiceByID = require("../data/getServiceByID.json");
var getSuppliers = require("../data/getSuppliers.json");
var getSupplierByID = require("../data/getSupplierByID.json");


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

router.get('/getServiceProviders',userHelpers.isLogin , function(req, res) {
  res.send(getServiceProviders);
});

router.post('/getServiceProviderByID',userHelpers.isLogin , function(req, res) {
  res.send(getServiceProviderByID);
});

router.get('/getServices',userHelpers.isLogin , function(req, res) {
  res.send(getServices);
});

router.put('/getServiceByID',userHelpers.isLogin , function(req, res) {
  res.send(getServiceByID);
});

router.get('/getSuppliers',userHelpers.isLogin , function(req, res) {
  res.send(getSuppliers);
});

router.put('/getSupplierByID',userHelpers.isLogin , function(req, res) {
  res.send(getSupplierByID);
});

module.exports = router;
