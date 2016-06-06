var express = require('express');
var router = express.Router();
var productMgr = require("../controller/product");

/* GET all customer */
router.get('/:limit/:page', function(req, res) {
  productMgr.getProduct(req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});
// otherEquipment

router.get('/otherEquipment/:limit/:page', function(req, res) {
  productMgr.getProductETC(req.params.limit,req.params.page,function(product){
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
router.get('/allService', function(req, res) {
  productMgr.getAllService(function(product){
    console.log(product);
    res.send(product);
  });
});

router.get('/allPackage', function(req, res) {
  productMgr.getAllPackage(function(product){
    res.send(product);
  });
});
router.get('/:id', function(req, res) {
  console.log(req.params.id);
  productMgr.getItemById(req.params.id,function(productService){
    console.log(productService);
    res.send(productService);
  });
});
//get service
router.get('/service/:limit/:page', function(req, res) {
  productMgr.getProductService(req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});

//get package
router.get('/package/:limit/:page', function(req, res) {
  productMgr.getProductPackage(req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});

router.get('/allEtc', function(req, res) {
  console.log("sdfsdf");
  productMgr.getAllEtc(function(product){
    console.log(product);
    res.send(product);
  });
});
/* Add new customer   */
router.post('/add', function(req, res) {
  productMgr.addProduct(req.body,function(product){
    res.send(product);
  });
});

router.get('/bytype/:id', function(req, res) {
  //console.log(req.params.id);
   res.send(true);
 /* productMgr.getAllProductByType(req.body.type,function(product){
    res.send(product);
  });*/
});


router.put('/productService/:id', function(req, res) {
  console.log(req.params.id);
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

router.put('/productPackages/edit/:id', function(req, res) {
  productMgr.updatePackage(req.params.id,req.body,function(productService){
    res.send(productService);
  });
});

router.put('/productEtc/edit/:id', function(req, res) {
  productMgr.updateEtc(req.params.id,req.body,function(productService){
    res.send(productService);
  });
});

router.delete('/productService/delete/:id', function(req, res) {
  productMgr.deleteProductService(req.params.id,function(productService){
     res.send({result:productService});
   });
});


module.exports = router;
