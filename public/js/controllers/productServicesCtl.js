(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('ProductServicesCtl',['$scope','$state','$stateParams','$modal','MenuFac','ProductsServ','toastr',function($scope,$state,$stateParams,$modal,MenuFac,ProductsServ,toastr){
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
  app.controller('ProductItemsCtl',['$scope','$state','$stateParams','HelperServ','$modal','MenuFac','ProductsServ','toastr',function($scope,$state,$stateParams,HelperServ,$modal,MenuFac,ProductsServ,toastr){
    MenuFac.active = 7;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
     HelperServ.getAllSuppliers();
    $scope.objects = HelperServ;
    HelperServ.getAllCities();
    $scope.cityObject = HelperServ;

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
  app.controller('ProductPackagesCtl',['$scope','$state','ServicesServ','HelperServ','$stateParams','$modal','MenuFac','ProductsServ','toastr',function($scope,$state,ServicesServ,HelperServ,$stateParams,$modal,MenuFac,ProductsServ,toastr){
    MenuFac.active = 7;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
     HelperServ.getAllSuppliers();
    $scope.objects = HelperServ;
    console.log($scope.objects);
    $scope.activeTab = "tap1";
    ServicesServ.getAllServices().then(function(response){
        $scope.ObjService=response.data;
    },function(response){
        console.log("Something went wrong");
      });
    $scope.init = function () {
      ProductsServ.getProductPackages($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.products = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();

    $scope.editProductPackageForm = {};
    ProductsServ.getProductServiceByID($stateParams.id,$scope.editProductItemForm).then(function(response) {

      $scope.editProductPackageForm = response.data[0];
    }, function(response) {
      console.log("Something went wrong");
    });

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
  app.controller('NewProductCtl',['$scope','ServicesServ','$state','MenuFac','ProductsServ','HelperServ','toastr',function($scope,ServicesServ,$state,MenuFac,ProductsServ,HelperServ,toastr){
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
    $scope.newServiceProduct = function(){
      $scope.newProductForm.type = "service";
      ProductsServ.addProduct($scope.newProductForm).then(function(response) {
        if(response.data){
          $state.go('productServices');
          toastr.success('تمت إضافة منتج جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.newItemProduct = function(){
      $scope.newProductForm.type = "item";
      ProductsServ.addProduct($scope.newProductForm).then(function(response) {
        if(response.data){
          $state.go('productItems');
          toastr.success('تمت إضافة منتج جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.newPackageProduct = function(){
      $scope.newProductForm.type = "package";
      ProductsServ.addProduct($scope.newProductForm).then(function(response) {
        if(response.data){
          $state.go('productPackages');
          toastr.success('تمت إضافة منتج جديد بنجاح');
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
}());