var express = require('express');
var router = express.Router();
var productMgr = require("../controller/product");
var productPolicyMgr = require("../controller/productPolicy");
var userHelpers = require("../controller/userHelpers");


/* GET all customer */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  productMgr.getProduct(req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});
// otherEquipment

router.get('/otherEquipment/:limit/:page',userHelpers.isLogin , function(req, res) {
  productMgr.getProductETC(req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});


router.get('/all', userHelpers.isLogin ,function(req, res) {
  productMgr.getAllProduct(function(product){
    res.send(product);
  });
});


// get item
router.get('/item/:limit/:page',userHelpers.isLogin , function(req, res) {
  productMgr.getProductItem(req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});
router.get('/allItem', userHelpers.isLogin ,function(req, res) {
  productMgr.getAllItem(function(product){
    res.send(product);
  });
});

router.get('/allItemR', userHelpers.isLogin ,function(req, res) {
  productMgr.getAllItemR(req.user.policy,function(product){
    res.send(product); 
  });
});
router.get('/allService',userHelpers.isLogin , function(req, res) {
  productMgr.getAllService(function(product){
    res.send(product);
  });
});

router.get('/allServiceR',userHelpers.isLogin , function(req, res) {
  productMgr.getAllService(function(product){
    res.send(product);
  });
});

router.get('/allPackage', userHelpers.isLogin ,function(req, res) {
  productMgr.getAllPackage(function(product){
    res.send(product);
  });
});
router.get('/allPackageR', userHelpers.isLogin ,function(req, res) {
  productMgr.getAllPackage(function(product){
    res.send(product);
  });
});

//get service
router.get('/service/:limit/:page', userHelpers.isLogin ,function(req, res) {
  productMgr.getProductService(req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});

//get package
router.get('/package/:limit/:page',userHelpers.isLogin , function(req, res) {
  productMgr.getProductPackage(req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});

router.get('/getPackagesByService/service/:id',userHelpers.isLogin , function(req, res) {
  productMgr.getProductPackageByService(req.params.id,function(product){
    res.send(product);
  });
 
});

router.get('/new/one/allEtc', userHelpers.isLogin ,function(req, res) {
    console.log("here");
    
  productMgr.getAllEtc(function(product){
    res.send(product);
  });
});
router.get('/allEtc', userHelpers.isLogin ,function(req, res) {    
  productMgr.getAllEtc(function(product){
    res.send(product);
  });
});
router.get('/allEtcR', userHelpers.isLogin ,function(req, res) {    
  productMgr.getAllEtc(function(product){
    res.send(product);
  });
});
/* Add new customer   */
router.post('/add', userHelpers.isLogin ,function(req, res) {

  productMgr.addProduct(req.body,function(product){
    res.send(product);
  });
});

router.get('/bytype/:id',userHelpers.isLogin , function(req, res) {
   res.send(true);
 /* productMgr.getAllProductByType(req.body.type,function(product){
    res.send(product);
  });*/
});


router.put('/productService/:id',userHelpers.isLogin , function(req, res) {
  productMgr.getItemById(req.params.id,function(productService){
    res.send(productService);
  });
});



router.put('/productService/edit/:id', userHelpers.isLogin ,function(req, res) {
  productMgr.updateService(req.params.id,req.body,function(productService){
    res.send(productService);
  });
});
//productItems
router.put('/productItems/edit/:id', userHelpers.isLogin ,function(req, res) {
  productMgr.updateItem(req.params.id,req.body,function(productService){
    res.send(productService);
  });
});

router.put('/productPackages/edit/:id',userHelpers.isLogin , function(req, res) {
  productMgr.updatePackage(req.params.id,req.body,function(productService){
    res.send(productService);
  });
});

router.put('/productEtc/edit/:id', userHelpers.isLogin ,function(req, res) {
  productMgr.updateEtc(req.params.id,req.body,function(productService){
    res.send(productService);
  });
});

router.delete('/productService/delete/:id', userHelpers.isLogin ,function(req, res) {
  productMgr.deleteProductService(req.params.id,function(productService){
     res.send({result:productService});
   });
});

router.get('/:id', userHelpers.isLogin ,function(req, res) {
  productMgr.getItemById(req.params.id,function(productService){
    res.send(productService);
  });
});
module.exports = router;
