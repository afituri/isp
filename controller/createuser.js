var user = require('./user');
var obj = {
  name : 'admin',
  email : 'admin@isp.com',
  password : 'admin102030'
};

user.register(obj, function(res){
 console.log(res);
});
