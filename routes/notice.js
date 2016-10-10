var express = require('express');
var router = express.Router();
var login = require('../controller/login')(router);
var model = require('../models');
var userHelpers = require("../controller/userHelpers");
var city = require('../data/lycities');
var noticeMgr = require("../controller/notice");



/* GET home page. */
router.get('/', function(req, res) {
  res.render('notice', { title: 'شاشة الدخول' });
});

/* Add new reseller  */
router.post('/add',userHelpers.isLogin , function(req, res) {
  console.log(req.body);
  noticeMgr.addNotice(req.body,function(reseller){
    res.send(reseller);
  });
});


module.exports = router;
