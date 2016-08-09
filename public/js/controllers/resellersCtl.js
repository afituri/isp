(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('ResellersCtl',['$scope','HelperServ','$modal','ResllersServ','MenuFac','toastr',function($scope,HelperServ,$modal,ResllersServ,MenuFac,toastr){
    MenuFac.active = 2;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    HelperServ.getAllCities();
    $scope.cityObject = HelperServ;


    $scope.searchCustomer = function() {
       ResllersServ.getResellerByName($scope.searchByName,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.resellers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }



    $scope.init = function () {
      ResllersServ.getResellers($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.resellers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا الموزع";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ResllersServ.deleteResller(id).then(function(response) {
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
  app.controller('NewResellerCtl',['$scope','$state','MenuFac','ResllersServ','HelperServ','toastr', function($scope,$state,MenuFac,ResllersServ,HelperServ,toastr){
    MenuFac.active = 2;
    $scope.newResllerForm = {};
    $scope.objects = HelperServ;
    $scope.objects.getAllWarehouses();
    $scope.objects.getAllPolicies();
    $scope.newResller = function(){
      ResllersServ.addResller($scope.newResllerForm).then(function(response) {
        if(response.data){
          $state.go('resellers');
          toastr.success('تمت إضافة موزع جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);
  app.controller('EditResellerCtl',['$scope','$state','$stateParams','ResllersServ','MenuFac','HelperServ','toastr',function($scope,$state,$stateParams,ResllersServ,MenuFac,HelperServ,toastr){
    MenuFac.active = 2;
    $scope.editResllerForm = {};
    $scope.objects = HelperServ;
    ResllersServ.getResellersByID($stateParams.id).then(function(response) {
      $scope.editResllerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editResller = function(){
      if($scope.editResllerForm.passwordd == $scope.editResllerForm.confirmPassword){
      ResllersServ.editResller($stateParams.id,$scope.editResllerForm).then(function(response) {
        if(response.data){
          $state.go('resellers');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    } else  {
      toastr.error("عفوا تأكيد الرقم السري غير متطابق");
    }
  }
  }]);
  app.controller('ShowResellerCtl',['$scope','$stateParams','ResllersServ','MenuFac',function($scope,$stateParams,ResllersServ,MenuFac){
    MenuFac.active = 2;
    $scope.showResllerForm = {};
    ResllersServ.getResellersByID($stateParams.id).then(function(response) {
      $scope.showResllerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
}());