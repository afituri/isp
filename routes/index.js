var express = require('express');
var router = express.Router();
var login = require('../controller/login')(router);
var user = require("../controller/user");



// user.register({email:"abdoo@gmail.com",password :'102030'},function(result){


// console.log(result);
// });
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
