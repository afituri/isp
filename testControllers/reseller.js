var reseller = require('../controller/reseller');
var obj = {
  repName:"Mohamed",
  companyName:"Naga",
  email:"ahmed.elfituri+102030@gmail.com",
  password:"102030",
  address:"sdfjs sdlf sdfsdf",
  langtitude:"2334 23123",
  longtitude:"123324342",
  phone: "0925032654"
};
reseller.add(obj,function(res){
  console.log(obj);
});