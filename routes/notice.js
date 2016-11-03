var express = require('express');
var router = express.Router();
var login = require('../controller/login')(router);
var model = require('../models');
var userHelpers = require("../controller/userHelpers");
var city = require('../data/lycities');
var noticeMgr = require("../controller/notice");



router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  noticeMgr.getNotice(req.params.limit,req.params.page,function(notice){
    res.send(notice);
  });
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('notice', { title: 'شاشة الدخول' });
});

//getNoticeLimit
router.get('/getNoticeLimit', function(req, res) {
	noticeMgr.getNoticeLimit(function(result){
  		res.send(result);
  	});
});


/* Add new reseller  */
router.post('/add',userHelpers.isLogin , function(req, res) {
  noticeMgr.addNotice(req.body,function(reseller){
    res.send(reseller);
  });
});

router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  noticeMgr.deleteNotice(req.params.id,function(dollar){
    res.send({result:dollar});
  });
});


module.exports = router;
