var express = require('express');
var router = express.Router();
var productMgr = require("../controller/product");

/* GET all customer */
router.get('/:limit/:page', function(req, res) {
  productMgr.getProduct(req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});
router.get('/all', function(req, res) {
  productMgr.getAllProduct(function(product){
    res.send(product);
  });
});
// get item
router.get('/item/:limit/:page', function(req, res) {
  productMgr.getProductItem(req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});
router.get('/allItem', function(req, res) {
  productMgr.getAllItem(function(product){
    res.send(product);
  });
});
//get service
router.get('/service/:limit/:page', function(req, res) {
  productMgr.getProductService(req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});
router.get('/allService', function(req, res) {
  productMgr.getAllService(function(product){
    res.send(product);
  });
});
//get package
router.get('/package/:limit/:page', function(req, res) {
  productMgr.getProductPackage(req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});
router.get('/allPackage', function(req, res) {
  productMgr.getAllPackage(function(product){
    res.send(product);
  });
});
/* Add new customer   */
router.post('/add', function(req, res) {
  productMgr.addProduct(req.body,function(product){
    res.send(product);
  });
});


router.put('/productService/:id', function(req, res) {
  productMgr.getItemById(req.params.id,function(productService){
    console.log(productService);
    res.send(productService);
  });
});

router.put('/productService/edit/:id', function(req, res) {
  productMgr.updateService(req.params.id,req.body,function(productService){
    res.send(productService);
  });
});
//productItems
router.put('/productItems/edit/:id', function(req, res) {
  productMgr.updateItem(req.params.id,req.body,function(productService){
    res.send(productService);
  });
});

router.delete('/productService/delete/:id', function(req, res) {
  productMgr.deleteProductService(req.params.id,function(productService){
     res.send({result:productService});
   });
});


module.exports = router;
