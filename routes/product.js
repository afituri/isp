var express = require('express');
var router = express.Router();
var productMgr = require("../controller/product");
var productPolicyMgr = require("../controller/productPolicy");
var resellerMgr = require("../controller/reseller");
var userHelpers = require("../controller/userHelpers");


router.get('/searchService/:name/:limit/:page',userHelpers.isLogin , function(req, res) {
  productMgr.getProductServiceByName(req.params.name,req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});

router.get('/searchPackages/:name/:limit/:page',userHelpers.isLogin , function(req, res) {
  productMgr.getProductPackagesByName(req.params.name,req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});

router.get('/searchItems/:name/:limit/:page',userHelpers.isLogin , function(req, res) {
  productMgr.getProductItemsByName(req.params.name,req.params.limit,req.params.page,function(product){
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

router.get('/allItemPolisy', userHelpers.isLogin ,function(req, res) {
  productMgr.getAll(function(product){
    productPolicyMgr.getProductPPolicy(req.user.policy,function(result){
      for(i in product){
        if(result[product[i]._id]){
          product[i].initialPrice=result[product[i]._id];
        }

        if(i==product.length-1){
          res.send(product);    
        }
      }
    });
  });
});
router.get('/allItemPolisyPac/:limit/:page/:service', userHelpers.isLogin ,function(req, res) {
  productMgr.getProductPackageSearch(req.params.limit,req.params.page,req.params.service,function(product){
    productPolicyMgr.getProductPPolicy(req.user.policy,function(result){
      for(i in product.result){
        if(result[product.result[i]._id]){
          product.result[i].initialPrice=result[product.result[i]._id];
        }

        if(i==product.result.length-1){
          res.send(product);    
        }
      }
    });
  });
});
router.get('/allItemPolisySer/:limit/:page', userHelpers.isLogin ,function(req, res) {
  productMgr.getProductService(req.params.limit,req.params.page,function(product){
    productPolicyMgr.getProductPPolicy(req.user.policy,function(result){
      for(i in product.result){
        if(result[product.result[i]._id]){
          product.result[i].initialPrice=result[product.result[i]._id];
        }

        if(i==product.result.length-1){
          res.send(product);    
        }
      }
    });
  });
});
router.get('/allItemPolisyIte/:limit/:page', userHelpers.isLogin ,function(req, res) {
  productMgr.getProductItem(req.params.limit,req.params.page,function(product){
    productPolicyMgr.getProductPPolicy(req.user.policy,function(result){
      for(i in product.result){
        if(result[product.result[i]._id]){
          product.result[i].initialPrice=result[product.result[i]._id];
        }

        if(i==product.result.length-1){
          res.send(product);    
        }
      }
    });
  });
});




router.get('/allItemR', userHelpers.isLogin ,function(req, res) {
  productMgr.getAllItem(function(product){
    productPolicyMgr.getProductPPolicy(req.user.policy,function(result){
      for(i in product){
        if(result[product[i]._id]){
          product[i].initialPrice=result[product[i]._id];
        }

        if(i==product.length-1){
          res.send(product);    
        }
      }
    });
  });
});
router.get('/allItemRA/:id', userHelpers.isLogin ,function(req, res) {
  productMgr.getAllItemR(function(product){
    resellerMgr.getResellerId(req.params.id,function(reseller){
      productPolicyMgr.getProductPPolicy(reseller.policy,function(result){
        for(i in product){
          if(result[product[i]._id]){
            product[i].initialPrice=result[product[i]._id];
          }

          if(i==product.length-1){
            res.send(product);    
          }
        }
      });
    });
  }); 
});
router.get('/allService',userHelpers.isLogin , function(req, res) {
  productMgr.getAllService(function(product){
    res.send(product);
  });
});

router.get('/allServiceR',userHelpers.isLogin , function(req, res) {
  productMgr.getAllService(function(product){
    productPolicyMgr.getProductPPolicy(req.user.policy,function(result){
      for(i in product){
        if(result[product[i]._id]){
          product[i].initialPrice=result[product[i]._id];
        }

        if(i==product.length-1){
          res.send(product);    
        }
      }
    });
  });
});
router.get('/allServiceRA/:id',userHelpers.isLogin , function(req, res) {
  productMgr.getAllService(function(product){
    resellerMgr.getResellerId(req.params.id,function(reseller){
      productPolicyMgr.getProductPPolicy(reseller.policy,function(result){
        for(i in product){
          if(result[product[i]._id]){
            product[i].initialPrice=result[product[i]._id];
          }

          if(i==product.length-1){
            res.send(product);    
          }
        }
      });
    });
  });
});
router.get('/allPackage', userHelpers.isLogin ,function(req, res) {
  productMgr.getAllPackage(function(product){
    res.send(product);
  });
});
router.get('/allPackageR', userHelpers.isLogin ,function(req, res) {
  productMgr.getAllPackage(function(product){
    productPolicyMgr.getProductPPolicy(req.user.policy,function(result){
      for(i in product){
        if(result[product[i]._id]){
          product[i].initialPrice=result[product[i]._id];
        }

        if(i==product.length-1){
          res.send(product);    
        }
      }
    });
  });
});

router.get('/allPackageRA/:id', userHelpers.isLogin ,function(req, res) {
  productMgr.getAllPackage(function(product){
    resellerMgr.getResellerId(req.params.id,function(reseller){
      productPolicyMgr.getProductPPolicy(reseller.policy,function(result){
        for(i in product){
          if(result[product[i]._id]){
            product[i].initialPrice=result[product[i]._id];
          }

          if(i==product.length-1){
            res.send(product);    
          }
        }
      });
    });
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
router.get('/packageSearch/:limit/:page/:service',userHelpers.isLogin , function(req, res) {
  productMgr.getProductPackageSearch(req.params.limit,req.params.page,req.params.service,function(product){
    res.send(product);
  });
});
router.get('/getPackagesByService/service/:id',userHelpers.isLogin , function(req, res) {
  productMgr.getProductPackageByService(req.params.id,function(product){
    res.send(product);
  });
 
});
router.get('/getPackagesByService/serviceR/:service/:reseller',userHelpers.isLogin , function(req, res) {
  productMgr.getProductPackageByService(req.params.service,function(product){
    resellerMgr.getResellerId(req.params.reseller,function(reseller){
      productPolicyMgr.getProductPPolicy(reseller.policy,function(result){
        for(i in product){
          if(result[product[i]._id]){
            product[i].initialPrice=result[product[i]._id];
          }

          if(i==product.length-1){
            res.send(product);    
          }
        }
      });
    });
  });
 
});
router.get('/new/one/allEtc', userHelpers.isLogin ,function(req, res) {
    
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
    productPolicyMgr.getProductPPolicy(req.user.policy,function(result){
      for(i in product){
        if(result[product[i]._id]){
          product[i].initialPrice=result[product[i]._id];
        }

        if(i==product.length-1){
          res.send(product);    
        }
      }
    });
  });
});

router.get('/allEtcRA/:id', userHelpers.isLogin ,function(req, res) {    
  productMgr.getAllEtc(function(product){
    resellerMgr.getResellerId(req.params.id,function(reseller){
      productPolicyMgr.getProductPPolicy(reseller.policy,function(result){
        for(i in product){
          if(result[product[i]._id]){
            product[i].initialPrice=result[product[i]._id];
          }

          if(i==product.length-1){
            res.send(product);    
          }
        }
      });
    });
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
/* GET all customer */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  productMgr.getProduct(req.params.limit,req.params.page,function(product){
    res.send(product);
  });
});
router.get('/:id', userHelpers.isLogin ,function(req, res) {
  productMgr.getItemById(req.params.id,function(productService){
    res.send(productService);
  });
});
module.exports = router;
