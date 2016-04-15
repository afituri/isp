var express = require('express');
var router = express.Router();
var productMgr = require("../controller/product");

/* GET all customer */
router.get('/:limit/:page', function(req, res) {
  productMgr.getProduct(req.params.limit,req.params.page,function(product){
    console.log(product);
    res.send(product);
  });
});
router.get('/all', function(req, res) {
  productMgr.getAllProduct(function(product){
    console.log(product);
    res.send(product);
  });
});
/* Add new customer   */
router.post('/add', function(req, res) {
  productMgr.addProduct(req.body,function(product){
    console.log(product);
    res.send(product);
  });
});

/* Edit customer  by id  */
// router.put('/edit/:id', function(req, res) {
//   // console.log(req.body)
//   // console.log(req.params.id);
//   customerMgr.updateCustomer(req.params.id,req.body,function(customer){
//     res.send(customer);
//   });
// });

// /* Delete customer  by id  */
// router.delete('/delete/:id', function(req, res) {
//   console.log(req.params.id);
//   customerMgr.deleteCustomer(req.params.id,function(customer){
//     res.send(customer);
//   });
// });

// /* GET customer  by ID  */
// router.get('/:id', function(req, res) {
//   // res.send(data.customer);
//   customerMgr.getCustomerId(req.params.id,function(customer){
//     res.send(customer);
//   });
// });


module.exports = router;
