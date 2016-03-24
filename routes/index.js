var express = require('express');
var router = express.Router();
var login = require('../controller/login')(router);
var user = require("../controller/user");
var reseller = require("../controller/reseller");



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

module.exports = router;
