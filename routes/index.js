var express = require('express');
var router = express.Router();
var login = require('../controller/login')(router);
var user = require("../controller/user");
var reseller = require("../controller/reseller");
var getResellers = require("../data/getResellers.json");
var getResellerByID = require("../data/getResellerByID.json");
var getServices = require("../data/getServices.json");
var getServiceByID = require("../data/getServiceByID.json");


// reseller.register({email:"abd@gmail.com",password :'102030'},function(result){


// console.log(result);
// });
/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'شاشة الدخول' });
});

router.get('/home', function(req, res) {
  res.render('index', { title: 'الرئسية' });
});

router.get('/getResellers', function(req, res) {
  res.send(getResellers);
});

router.post('/getResellerByID', function(req, res) {
  res.send(getResellerByID);
});

router.get('/getServices', function(req, res) {
  res.send(getServices);
});

router.post('/getServiceByID', function(req, res) {
  res.send(getServiceByID);
});

module.exports = router;
