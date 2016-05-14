(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('ProductPoliciesCtl',['$scope','MenuFac','ProductPoliciesServ',function($scope,MenuFac,ProductPoliciesServ){
    MenuFac.active = 8;
    $scope.activePanel = MenuFac;
  }]);
  app.controller('NewProductPolicyCtl',['$scope','$state','MenuFac','ProductPoliciesServ','HelperServ','toastr',function($scope,$state,MenuFac,ProductPoliciesServ,HelperServ,toastr){
    MenuFac.active = 8;
    $scope.activePanel = MenuFac;
    $scope.activeTab = "tap1";
    $scope.objects = HelperServ;
    $scope.objects.getAllItems();
    $scope.objects.getAllServices();
    $scope.objects.getAllPackages();
    $scope.objects.getAllPolicies();
    $scope.newProductPolicyForm = {};
    $scope.newServiceProductPolicy = function(){
      $scope.newProductPolicyForm.type = "service";
      ProductPoliciesServ.addProductPolicy($scope.newProductPolicyForm).then(function(response){
        if(response.data){
          $state.go('productPolicies');
          toastr.success('تمت إضافة سياسة جديدة بنجاح');
        } else {
          console.log(response.data);
        }
      },function(response){
        console.log("Something went wrong");
      });
    };
    $scope.newItemProductPolicy = function(){
      $scope.newProductPolicyForm.type = "item";
      ProductPoliciesServ.addProductPolicy($scope.newProductPolicyForm).then(function(response){
        if(response.data){
          $state.go('productPoliciesItem');
          toastr.success('تمت إضافة سياسة جديدة بنجاح');
        } else {
          console.log(response.data);
        }
      },function(response){
        console.log("Something went wrong");
      });
    };
    $scope.newPackageProductPolicy = function(){
      $scope.newProductPolicyForm.type = "package";
      ProductPoliciesServ.addProductPolicy($scope.newProductPolicyForm).then(function(response){
        if(response.data){
          $state.go('productPolicies');
          toastr.success('تمت إضافة سياسة جديدة بنجاح');
        } else {
          console.log(response.data);
        }
      },function(response){
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditProductPolicyCtl',['$scope','MenuFac','ProductPoliciesServ',function($scope,MenuFac,ProductPoliciesServ){
    MenuFac.active = 8;
    $scope.activePanel = MenuFac;
  }]);

  app.controller('ProductPoliciesServiceCtl',['$scope','$state','PoliciesServ','HelperServ','$stateParams','toastr','$modal','MenuFac','ProductPoliciesServ',function($scope,$state,PoliciesServ,HelperServ,$stateParams,toastr,$modal,MenuFac,ProductPoliciesServ){
    MenuFac.active = 8;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.editPolicyServiceForm = {};
    $scope.objects = HelperServ;
    $scope.objects.getAllItems();
    $scope.objects.getAllServices();
    $scope.objects.getAllPackages();
    $scope.objects.getAllPolicies();
    ProductPoliciesServ.getProductPolicyByID($stateParams.id).then(function(response) {
      console.log(response.data);
      $scope.editPolicyServiceForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editProductPolicy = function(){
      ProductPoliciesServ.editProductPolicy($stateParams.id,$scope.editPolicyServiceForm).then(function(response) {
        if(response.data){
          $state.go('productPoliciesService');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }

    $scope.init = function () {
      ProductPoliciesServ.getProductPolicies($scope.pageSize,$scope.currentPage,{type:"service"}).then(function(response) {
        $scope.policies = response.data.result;
        console.log($scope.policies);
        $scope.total = response.data.count;
        console.log($scope.total);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init();

     $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذه سياسات منتج (الخدمة)";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ProductPoliciesServ.deleteProductPolicy(id).then(function(response) {
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          toastr.success('تم الحذف بنجاح');
          $scope.init();
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

  app.controller('ProductPoliciesItemCtl',['$scope','$state','PoliciesServ','HelperServ','$stateParams','toastr','$modal','MenuFac','ProductPoliciesServ',function($scope,$state,PoliciesServ,HelperServ,$stateParams,toastr,$modal,MenuFac,ProductPoliciesServ){
    // edit form data 
    MenuFac.active = 8;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.objects = HelperServ;
    $scope.objects.getAllItems();
    $scope.objects.getAllServices();
    $scope.objects.getAllPackages();
    $scope.objects.getAllPolicies();

    $scope.editPolicyItemForm ={};
    ProductPoliciesServ.getProductPolicyByID($stateParams.id).then(function(response) {
      console.log(response.data);
      $scope.editPolicyItemForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
      //edit function 
    $scope.editProductPolicy = function(){
      ProductPoliciesServ.editProductPolicy($stateParams.id,$scope.editPolicyItemForm).then(function(response) {
        if(response.data){
          $state.go('productPoliciesItem');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }

    $scope.init = function () {
      ProductPoliciesServ.getProductPolicies($scope.pageSize,$scope.currentPage,{type:"item"}).then(function(response) {
        $scope.policies = response.data.result;
        console.log($scope.policies);
        $scope.total = response.data.count;
        console.log($scope.total);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init();

    $scope.showDeleteModel = function(id){
        $scope.id = id;
        $scope.deleteName = "هذه سياسات منتج (المعدة)";
        $scope.deleteModel = $modal({
          scope: $scope,
          templateUrl: 'pages/model.delete.tpl.html',
          show: true
        });
    };
    $scope.confirmDelete = function(id){
      ProductPoliciesServ.deleteProductPolicy(id).then(function(response) {
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          toastr.success('تم الحذف بنجاح');
          $scope.init();
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

  app.controller('ProductPoliciesPackageCtl',['$scope','$state','PoliciesServ','HelperServ','$stateParams','toastr','$modal','MenuFac','ProductPoliciesServ',function($scope,$state,PoliciesServ,HelperServ,$stateParams,toastr,$modal,MenuFac,ProductPoliciesServ){
    // edit form data 
    MenuFac.active = 8;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.objects = HelperServ;
    $scope.objects.getAllItems();
    $scope.objects.getAllServices();
    $scope.objects.getAllPackages();
    $scope.objects.getAllPolicies();

    /*$scope.editPolicyItemForm ={};
    ProductPoliciesServ.getProductPolicyByID($stateParams.id).then(function(response) {
      console.log(response.data);
      $scope.editPolicyItemForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
      //edit function 
    $scope.editProductPolicy = function(){
      ProductPoliciesServ.editProductPolicy($stateParams.id,$scope.editPolicyItemForm).then(function(response) {
        if(response.data){
          $state.go('productPoliciesItem');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }

    $scope.init = function () {
      ProductPoliciesServ.getProductPolicies($scope.pageSize,$scope.currentPage,{type:"item"}).then(function(response) {
        $scope.policies = response.data.result;
        console.log($scope.policies);
        $scope.total = response.data.count;
        console.log($scope.total);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init();

    $scope.showDeleteModel = function(id){
        $scope.id = id;
        $scope.deleteName = "هذه سياسات منتج (المعدة)";
        $scope.deleteModel = $modal({
          scope: $scope,
          templateUrl: 'pages/model.delete.tpl.html',
          show: true
        });
    };
    $scope.confirmDelete = function(id){
      ProductPoliciesServ.deleteProductPolicy(id).then(function(response) {
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          toastr.success('تم الحذف بنجاح');
          $scope.init();
        } else if (response.data.result == 3){
          $scope.deleteModel.hide();
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      }, function(response) {
        $scope.deleteModel.hide();
        console.log("Something went wrong");
      });
    };
  
*/
}]);
}());
