(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('ServiceProvidersCtl',['$scope','PermissionServ','$modal','MenuFac','ServiceProvidersServ','toastr',function($scope,PermissionServ,$modal,MenuFac,ServiceProvidersServ,toastr){
    PermissionServ.getSubpermission().then(function(response){
        
        $scope.permission =true;
        if(response.data[0] != undefined){
          console.log(response.data[5]);
          //employee
          $scope.permission =false;
 
          $scope.addServiceProvider =  response.data[5].add;
          $scope.deleteServiceProvider = response.data[5].delete; 
          $scope.editServiceProvider = response.data[5].edit; 
        } else {
          //admin
          $scope.addServiceProvider =  true;
          $scope.deleteServiceProvider = true; 
          $scope.editServiceProvider = true;
        }

    },function(response){
      console.log("Somthing went wrong");
    }); 





    MenuFac.active = 0;
    $scope.activePanel = MenuFac;
    ServiceProvidersServ.getServiceProviders();
    $scope.serviceProviders = ServiceProvidersServ;
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "مزود الخدمة هذا";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ServiceProvidersServ.deleteServiceProvider(id).then(function(response) {
        //alert(response.data.result);
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          ServiceProvidersServ.getServiceProviders();
          $scope.serviceProviders = ServiceProvidersServ;
         // $scope.init();
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
  app.controller('NewServiceProviderCtl',['$scope','$state','MenuFac','ServiceProvidersServ','toastr',function($scope,$state,MenuFac,ServiceProvidersServ,toastr){
    MenuFac.active = 0;
    $scope.activePanel = MenuFac;
    $scope.newServiceProviderForm = {};
    $scope.newServiceProvider = function(){
      ServiceProvidersServ.addServiceProvider($scope.newServiceProviderForm).then(function(response) {
        if(response.data){
          $scope.newServiceProviderForm = {};
          $state.go('serviceProviders');
          toastr.success('تمت إضافة مزود خدمة جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditServiceProviderCtl',['$scope','$stateParams','$state','MenuFac','ServiceProvidersServ','toastr',function($scope,$stateParams,$state,MenuFac,ServiceProvidersServ,toastr){
    MenuFac.active = 0;
    $scope.activePanel = MenuFac;
    $scope.editServiceProviderForm = {};
    ServiceProvidersServ.getServiceProviderByID($stateParams.id).then(function(response) {
      $scope.editServiceProviderForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editServiceProvider = function(){
      ServiceProvidersServ.editServiceProvider($stateParams.id,$scope.editServiceProviderForm).then(function(response) {
        if(response.data){
          $state.go('serviceProviders');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);
  app.controller('DetailServiceProviderCtl',['$scope','PermissionServ','$stateParams','MenuFac','ServiceProvidersServ',function($scope,PermissionServ,$stateParams,MenuFac,ServiceProvidersServ){
    PermissionServ.getSubpermission().then(function(response){
        
        $scope.permission =true;
        if(response.data[0] != undefined){
          console.log(response.data[5]);
          //employee
          $scope.permission =false;
 
          $scope.addServiceProvider =  response.data[5].add;
          $scope.deleteServiceProvider = response.data[5].delete; 
          $scope.editServiceProvider = response.data[5].edit; 
        } else {
          //admin
          $scope.addServiceProvider =  true;
          $scope.deleteServiceProvider = true; 
          $scope.editServiceProvider = true;
        }

    },function(response){
      console.log("Somthing went wrong");
    }); 




    MenuFac.active = 0;
    $scope.activePanel = MenuFac;
    $scope.services = {};
    $scope.detailServiceProvidersForm = {};
    ServiceProvidersServ.getServiceProviderByID($stateParams.id).then(function(response) {
      $scope.detailServiceProviderForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    ServiceProvidersServ.getServiceProvidersServicesByID($stateParams.id).then(function(response) {
      $scope.services = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
}());