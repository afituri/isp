var express = require('express');
var router = express.Router();
var login = require('../controller/login')(router);
var user = require("../controller/user");
var reseller = require("../controller/reseller");
var dollarMgr = require("../controller/dollar");
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

router.get('/dashboard',userHelpers.isLogin ,function(req, res) {
  dollarMgr.getLastDollar(function(result){ 
  var doll;
  if(result[0]==undefined){
  	doll=" ";
  } else {
  	doll=result[0].price;
  }
  var name='';
  console.log(req.user);
  if(req.user==undefined){
  	name=" ";  
  } else {
  	name = req.user.name;
  }
  res.render('index', { title: 'الرئيسية' ,name : name,dollar:doll});
  })
});

router.get('/reseller',userHelpers.isLogin ,function(req, res) {
    dollarMgr.getLastDollar(function(result){ 
  var doll;
  if(result[0]==undefined){
    doll=" ";
  } else {
    doll=result[0].price;
  }
  res.render('reseller/index', { title: 'الرئيسية' ,name : req.user.repName,dollar:doll});
   });
});

module.exports = router;
