(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('ServicesCtl',['$scope','$modal','MenuFac','ServicesServ','toastr',function($scope,$modal,MenuFac,ServicesServ,toastr){
    
    MenuFac.active = 1;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;


    
    $scope.searchCustomer =function(){
      ServicesServ.getServicesByName($scope.searchByName,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.services = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }

    $scope.init = function () {
      ServicesServ.getServices($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.services = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذه الخدمة";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ServicesServ.deleteService(id).then(function(response) {
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
  app.controller('NewServiceCtl',['$scope','$state','MenuFac','ServiceProvidersServ','ServicesServ','toastr',function($scope,$state,MenuFac,ServiceProvidersServ,ServicesServ,toastr){
    MenuFac.active = 1;
    $scope.activePanel = MenuFac;
    $scope.serviceProviders = ServiceProvidersServ;
    $scope.newServiceForm = {};
    $scope.newService = function(){
      ServicesServ.addService($scope.newServiceForm).then(function(response) {
        if(response.data){
          $state.go('services');
          toastr.success('تمت إضافة خدمة جديدة بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditServiceCtl',['$scope','$state','$stateParams','MenuFac','ServicesServ','ServiceProvidersServ','toastr',function($scope,$state,$stateParams,MenuFac,ServicesServ,ServiceProvidersServ,toastr){
    MenuFac.active = 1;
    $scope.activePanel = MenuFac;
    $scope.editServiceForm = {};
    $scope.serviceProviders = ServiceProvidersServ;
    ServicesServ.getServiceByID($stateParams.id).then(function(response) {
      $scope.editServiceForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editService = function(){
      ServicesServ.editService($stateParams.id,$scope.editServiceForm).then(function(response) {
        if(response.data){
          $state.go('services');
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