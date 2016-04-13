// var reseller = require('../controller/reseller');
// var obj = {
//   repName:"Mohamed",
//   companyName:"Naga",
//   email:"ahmed.elfituri+102030@gmail.com",
//   password:"102030",
//   address:"sdfjs sdlf sdfsdf",
//   langtitude:"2334 23123",
//   longtitude:"123324342",
//   phone: "0925032654"
// };
// // reseller.add(obj,function(res){
// //   console.log(obj);
// // });

// var updateObj = {
//   langtitude:"2334 23123",
//   phone:"09993939399"
// }
// var id = "56f8fbd4f9e2594a198ddb9f";

// reseller.edit(id,updateObj,function(res){
//   console.log(res);
// });

  var model = require("../models");


  model.Product.find({}).populate('packages.service')
    .exec(function(err, services){
      if(!err){
        console.log(services);
      }else{
        console.log(err);
        console.log(null);
      }
    });