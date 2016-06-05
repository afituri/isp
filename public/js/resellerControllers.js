(function(){
  'use strict';
  var app = angular.module('reseller');
  app.controller('CustomersPendingCtl',['$scope','$modal','CustomersServ','toastr',function($scope,$modal,CustomersServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    
     $scope.init = function () {
      CustomersServ.getCustomersReject(2,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.customers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا الزبون";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      CustomersServ.deleteCustomer(id).then(function(response) {
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

 app.controller('CustomersRejectCtl',['$scope','$modal','CustomersServ','toastr',function($scope,$modal,CustomersServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    
    $scope.init = function () {
      CustomersServ.getCustomersReject(3,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.customers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا الزبون";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      CustomersServ.deleteCustomer(id).then(function(response) {
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

  app.controller('NewCustomerPendingCtl',['$scope','$state','CustomersServ','HelperServ','toastr',function($scope,$state,CustomersServ,HelperServ,toastr){
    $scope.newCustomerForm = {};
    $scope.objects = HelperServ;
    $scope.newCustomer = function(){
      $scope.newCustomerForm.status = 2;
      CustomersServ.addCustomer($scope.newCustomerForm).then(function(response) {
        if(response.data){
          $state.go('customersPending');
          toastr.success('تمت إضافة زبون جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  

  app.controller('NewCustomerCtl',['$scope','$state','CustomersServ','HelperServ','toastr',function($scope,$state,CustomersServ,HelperServ,toastr){
    $scope.newCustomerForm = {};
    $scope.objects = HelperServ;
    $scope.newCustomer = function(){
      CustomersServ.addCustomer($scope.newCustomerForm).then(function(response) {
        if(response.data){
          $state.go('customers');
          toastr.success('تمت إضافة زبون جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditCustomerCtl',['$scope','$state','$stateParams','CustomersServ','HelperServ','toastr',function($scope,$state,$stateParams,CustomersServ,HelperServ,toastr){
    $scope.editCustomerForm = {};
    $scope.objects = HelperServ;
    CustomersServ.getCustomerByID($stateParams.id).then(function(response) {
      $scope.editCustomerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editCustomer = function(){
      CustomersServ.editCustomer($stateParams.id,$scope.editCustomerForm).then(function(response) {
        if(response.data){
          $state.go('customersPending');
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