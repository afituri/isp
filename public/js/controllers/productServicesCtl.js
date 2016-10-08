(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('ProductServicesCtl',['$scope','PermissionServ','$state','$stateParams','$modal','MenuFac','ProductsServ','toastr',function($scope,PermissionServ,$state,$stateParams,$modal,MenuFac,ProductsServ,toastr){
      PermissionServ.getSubpermission().then(function(response){
      $scope.permission =true;
      if(response.data[0] != undefined){
        console.log(response.data[8]);
        //employee
        $scope.permission =false;

        $scope.addProductService =  response.data[8].add;
        $scope.deleteProductService = response.data[8].delete; 
        $scope.editProductService = response.data[8].edit; 
      } else {
        //admin
        $scope.addProductService =  true;
        $scope.deleteProductService = true; 
        $scope.editProductService = true;
      }
    },function(response){
      console.log("Somthing went wrong");
    });



    MenuFac.active = 7;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.editProductServiceForm = {};
    ProductsServ.getProductServiceByID($stateParams.id).then(function(response) {
      console.log(response.data);
      $scope.editProductServiceForm = response.data[0];
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.searchProductService = function(){
      $scope.package = '-1';
      $scope.results = [];
      if($scope.searchByName == ""){
        $scope.init();
      } else {
      ProductsServ.getProductsByName($scope.searchByName,$scope.pageSize,$scope.currentPage).then(function(response){
        $scope.productServices = response.data.result;
        $scope.total = response.data.count;
      },function(response){
        console.log("Something went wrong");
      });
    }
    }
    $scope.editProductService = function(){
      ProductsServ.editProductService($stateParams.id,$scope.editProductServiceForm).then(function(response) {
        if(response.data){
          $state.go('productServices');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init = function () {
      ProductsServ.getProductServices($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.productServices = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "منتج الخدمة";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ProductsServ.deleteProductService(id).then(function(response) {
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          $scope.init();
          toastr.success('تم الحذف بنجاح');
        } else if (response.data.result == 3){
          $scope.deleteModel.hide();
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      }, function(response) {
        $scope.deleteModel.hide();
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('ProductItemsCtl',['$scope','PermissionServ','$state','$stateParams','HelperServ','$modal','MenuFac','ProductsServ','toastr',function($scope,PermissionServ,$state,$stateParams,HelperServ,$modal,MenuFac,ProductsServ,toastr){
    

      PermissionServ.getSubpermission().then(function(response){
      $scope.permission =true;
      if(response.data[0] != undefined){
        console.log(response.data[9]);
        //employee
        $scope.permission =false;

        $scope.addProductItems =  response.data[9].add;
        $scope.deleteProductItems = response.data[9].delete; 
        $scope.editProductItems = response.data[9].edit; 
      } else {
        //admin
        $scope.addProductItems =  true;
        $scope.deleteProductItems = true; 
        $scope.editProductItems = true;
      }
    },function(response){
      console.log("Somthing went wrong");
    });



    MenuFac.active = 7;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
     HelperServ.getAllSuppliers();
    $scope.objects = HelperServ;
    HelperServ.getAllCities();
    $scope.cityObject = HelperServ;

    $scope.searchProductItems = function(){
      $scope.package = '-1';
      $scope.results = [];
      if($scope.searchByName == ""){
        $scope.init();
      } else {
      ProductsServ.getProductsItemsByName($scope.searchByName,$scope.pageSize,$scope.currentPage).then(function(response){
        $scope.productItems = response.data.result;
        $scope.total = response.data.count;
        console.log($scope.products);
      },function(response){
      });
    }
    }
    $scope.init = function () {
      ProductsServ.getProductItems($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.productItems = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.editProductItemForm = {};
    ProductsServ.getProductServiceByID($stateParams.id,$scope.editProductItemForm).then(function(response) {

      $scope.editProductItemForm = response.data[0];
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editProductItems = function(){
/*      var objCity=angular.element('#country').val();
      console.log(objCity.slice(7,objCity.length));*/
      /*$scope.editProductItemForm.city=objCity.slice(7,objCity.length);*/
      ProductsServ.editProductItem($stateParams.id,$scope.editProductItemForm).then(function(response) {
        if(response.data){
          $state.go('productItems');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }

    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا المنتج (المعدة)";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ProductsServ.deleteProductService(id).then(function(response) {
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          $scope.init();
          toastr.success('تم الحذف بنجاح');
        } else if (response.data.result == 3){
          $scope.deleteModel.hide();
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      }, function(response) {
        $scope.deleteModel.hide();
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('ProductPackagesCtl',['$scope','PermissionServ','$state','ServicesServ','HelperServ','$stateParams','$modal','MenuFac','ProductsServ','toastr',function($scope,PermissionServ,$state,ServicesServ,HelperServ,$stateParams,$modal,MenuFac,ProductsServ,toastr){
     PermissionServ.getSubpermission().then(function(response){
      $scope.permission =true;
      if(response.data[0] != undefined){
        console.log(response.data[10]);
        //employee
        $scope.permission =false;

        $scope.addProductPackage =  response.data[10].add;
        $scope.deleteProductPackage = response.data[10].delete; 
        $scope.editProductPackage = response.data[10].edit; 
      } else {
        //admin
        $scope.addProductPackage =  true;
        $scope.deleteProductPackage = true; 
        $scope.editProductPackage = true;
      }
    },function(response){
      console.log("Somthing went wrong");
    });


    MenuFac.active = 7;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.service;
     HelperServ.getAllSuppliers();
    $scope.objects = HelperServ;
    $scope.activeTab = "tap1";
    ServicesServ.getAllServices().then(function(response){
        $scope.ObjService=response.data;
    },function(response){
        console.log("Something went wrong");
      });
    $scope.init = function () {
      if(!$scope.service){
        var ser = -1;
      }else{
        var ser = $scope.service;
      }

      ProductsServ.getProductPackagesSearch($scope.pageSize,$scope.currentPage,ser).then(function(response) {
        $scope.products = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.refresh = function(){
      $scope.init();
    }
    $scope.editProductPackageForm = {};
    ProductsServ.getProductServiceByID($stateParams.id,$scope.editProductItemForm).then(function(response) {

      $scope.editProductPackageForm = response.data[0];
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.searchProductPackages = function(){
      $scope.package = '-1';
      $scope.results = [];
      if($scope.searchByName == ""){
        $scope.init();
      } else {
      ProductsServ.getProductsPackagesByName($scope.searchByName,$scope.pageSize,$scope.currentPage).then(function(response){
        $scope.products = response.data.result;
        $scope.total = response.data.count;
        console.log($scope.products);
      },function(response){
        console.log("Something went wrong");
      });
    }
    }
    $scope.editProductPackages = function(){
      /*var objCity=angular.element('#country').val();
      console.log(objCity.slice(7,objCity.length));
      $scope.editProductItemForm.city=objCity.slice(7,objCity.length);*/
      ProductsServ.editProductPackage($stateParams.id,$scope.editProductPackageForm).then(function(response) {
        if(response.data){
          $state.go('productPackages');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }


    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا المنتج (حزمة)";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ProductsServ.deleteProductService(id).then(function(response) {
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          $scope.init();
          toastr.success('تم الحذف بنجاح');
        } else if (response.data.result == 3){
          $scope.deleteModel.hide();
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      }, function(response) {
        $scope.deleteModel.hide();
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('NewProductCtl',['$scope','$timeout','ServicesServ','$state','MenuFac','ProductsServ','HelperServ','toastr',function($scope,$timeout,ServicesServ,$state,MenuFac,ProductsServ,HelperServ,toastr){
    MenuFac.active = 7;
    
    $scope.activePanel = MenuFac;
    $scope.newProductForm = {};
    HelperServ.getAllSuppliers();
    $scope.objects = HelperServ;
    console.log($scope.objects);
    $scope.activeTab = "tap1";
    ServicesServ.getAllServices().then(function(response){
        $scope.ObjService=response.data;
    },function(response){
        console.log("Something went wrong");
      });
    $scope.getServiceByID = function(id){
      HelperServ.getServiceProvidersServicesByID(id).then(function(response){
        $scope.serviceProviderOfservices = response.data;
      },function(response){
        console.log("Something went wrong");
      })
    };
    var flag1=true;
    $scope.newProductForm.packages={};
    $scope.speetType = function(id){
      $scope.newProductForm.packages.dSpeed="";
      if($scope.newProductForm.packages.dSpeed!=undefined){
      $scope.newProductForm.packages.dSpeed=$scope.newProductForm.packages.dSpeed+id;
      } else {
        $scope.newProductForm.packages.dSpeed=id;
      }
  }

    $scope.UType  = function(id){
      $scope.newProductForm.packages.uSpeed="";
      if($scope.newProductForm.packages.uSpeed != undefined){
        $scope.newProductForm.packages.uSpeed=$scope.newProductForm.packages.uSpeed+id;
      } else {
        $scope.newProductForm.packages.uSpeed=id;
      }
    }

    $scope.GBTypee = function(id){
      $scope.newProductForm.packages.monthlyQuota="";
        if($scope.newProductForm.packages.monthlyQuota != undefined){
        $scope.newProductForm.packages.monthlyQuota=$scope.newProductForm.packages.monthlyQuota+id;
      } else {
        $scope.newProductForm.packages.monthlyQuota=id;
      }

    }


    $scope.newServiceProduct = function(){
      $scope.newProductForm.type = "service";
      $scope.loadingStatus = true;
      ProductsServ.addProduct($scope.newProductForm).then(function(response) {
        if(response.data){
          $timeout(function () {
            $scope.loadingStatus = false;
            $scope.newProductForm = {};
            $state.go('productServices');
            toastr.success('تمت إضافة منتج جديد بنجاح');
          },3000);
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.newEtcProduct = function(){
      $scope.newProductForm.type = "etc";
      $scope.loadingStatus = true;
      ProductsServ.addProduct($scope.newProductForm).then(function(response) {
        if(response.data){
          $timeout(function () {
            $scope.loadingStatus = false;
            $scope.newProductForm = {};
            $state.go('productOtherEquipments');
            toastr.success('تمت إضافة منتج جديد بنجاح');
          },3000);
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.newItemProduct = function(){
      $scope.newProductForm.type = "item";
      $scope.loadingStatus = true;
      ProductsServ.addProduct($scope.newProductForm).then(function(response) {
        if(response.data){
          $timeout(function () {
            $scope.loadingStatus = false;
            $scope.newProductForm = {};
            $state.go('productItems');
            toastr.success('تمت إضافة منتج جديد بنجاح');
          },3000);
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.newPackageProduct = function(){
      $scope.newProductForm.type = "package";
      $scope.loadingStatus = true;
      ProductsServ.addProduct($scope.newProductForm).then(function(response) {
        if(response.data){
          $timeout(function () {
            $scope.loadingStatus = false;
            $scope.newProductForm = {};
            $state.go('productPackages');
            toastr.success('تمت إضافة منتج جديد بنجاح');
          },3000);
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditProductCtl',['$scope','$state','$stateParams','MenuFac','ProductsServ','HelperServ','toastr',function($scope,$state,$stateParams,MenuFac,ProductsServ,HelperServ,toastr){
    MenuFac.active = 7;
    $scope.activePanel = MenuFac;
    $scope.editProductForm = {};
    HelperServ.getAllServices();
    HelperServ.getAllSuppliers();
    $scope.objects = HelperServ;
    ProductsServ.getProductByID($stateParams.id).then(function(response) {
      console.log(response.data);
      $scope.editProductForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editProduct = function(){
      ProductsServ.editProduct($stateParams.id,$scope.editProductForm).then(function(response) {
        if(response.data){
          $state.go('products');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);
  app.controller('ProductOtherEquipmentCtl',['$scope','$state','$stateParams','$modal','ProductsServ','toastr',function($scope,$state,$stateParams,$modal,ProductsServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function () {
      ProductsServ.getProductOtherEquipments($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.productOtherEquipments = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "معدات اخري";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ProductsServ.deleteProductService(id).then(function(response) {
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          $scope.init();
          toastr.success('تم الحذف بنجاح');
        } else if (response.data.result == 3){
          $scope.deleteModel.hide();
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      }, function(response) {
        $scope.deleteModel.hide();
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditProductOtherEquipmentsCtl',['$scope','$state','$stateParams','$modal','ProductsServ','toastr',function($scope,$state,$stateParams,$modal,ProductsServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.editProductOtherEquForm = {};
    ProductsServ.getProductOtherEquipmentByID($stateParams.id).then(function(response) {
      console.log(response.data);
      $scope.editProductOtherEquForm = response.data[0];
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editProductOtherEqu = function(){
      ProductsServ.editProductOtherEquipment($stateParams.id,$scope.editProductOtherEquForm).then(function(response) {
        if(response.data){
          $state.go('productOtherEquipments');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);
}());