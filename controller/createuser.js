var user = require('./user');
var config = require('../config'); // get our config file

var obj = {
  name : 'admin',
  email : config.admin_user,
  password : config.admin_pass
};

user.register(obj, function(res){
 console.log(res);
});
