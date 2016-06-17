var express = require('express');
var router = express.Router();
var data = require('../data/policy');
var policyMgr = require("../controller/policies");
var productPMgr = require("../controller/policies");
var productPolicyMgr = require("../controller/productPolicy");
var userHelpers = require("../controller/userHelpers");



/* GET all policy */
router.get('/:limit/:page', userHelpers.isLogin ,function(req, res) {
  policyMgr.getPolicies(req.params.limit,req.params.page,function(policies){
    res.send(policies);
  });
});
//productPolicy
router.post('/productPolicy/:limit/:page', userHelpers.isLogin ,function(req, res) {
 
  productPolicyMgr.getProductP(req.body.type,req.params.limit,req.params.page,function(policies){
    res.send(policies);
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res) {
  policyMgr.getAllPolicies(function(policies){
    res.send(policies);
  });
});
/* Add new policy   */
router.post('/add',userHelpers.isLogin , function(req, res) {
  policyMgr.addPolicy(req.body,function(result){
    res.send(result);
  });
});

/* Edit policy  by id  */
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  policyMgr.updatePolicy(req.params.id,req.body,function(result){
    res.send(result);
  });

});

//productPolicy

router.put('/productPolicy/edit/:id', userHelpers.isLogin ,function(req, res) {
  productPolicyMgr.updateProductP(req.params.id,req.body,function(result){
    res.send(result);
  });

});

/* Delete policy  by id  */
router.delete('/delete/:id', userHelpers.isLogin ,function(req, res) {
  policyMgr.deletePolicy(req.params.id,function(result){
    res.send({result:result});  
  });
});

router.delete('/productPolicy/delete/:id',userHelpers.isLogin , function(req, res) {
  productPolicyMgr.deleteProductPolicyService(req.params.id,function(result){
    res.send({result:result});  
  });
});

/* GET policy  by ID  */
router.get('/:id', userHelpers.isLogin ,function(req, res) {
  policyMgr.getPolicyId(req.params.id,function(result){
    res.send(result);  
  });
});

/* GET product Policies for policy by ID  */
router.get('/:id/productPolicies', userHelpers.isLogin ,function(req, res) {
  // res.send(data.productPolicies);
  productPMgr.getProduct(req.params.id,function(result){
    res.send(result);  
  });
});

// product policy

router.post('/productPolicy/add',userHelpers.isLogin , function(req, res) {
  productPolicyMgr.addProductP(req.body,function(result){
    res.send(result);
  });
});

//productPolicyService
router.post('/productPolicyService/:id',userHelpers.isLogin , function(req, res) {
  productPolicyMgr.getProductPId(req.params.id,function(result){

    res.send(result);
  });
});




module.exports = router;
