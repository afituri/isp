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
          $state.go('productPolicies');
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
}());