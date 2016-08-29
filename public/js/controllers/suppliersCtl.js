(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('SuppliersCtl',['$scope','PermissionServ','$modal','MenuFac','SuppliersServ','toastr',function($scope,PermissionServ,$modal,MenuFac,SuppliersServ,toastr){
    
    PermissionServ.getSubpermission().then(function(response){
      $scope.permission =true;
      if(response.data[0] != undefined){
        console.log(response.data[4]);
        //employee
        $scope.permission =false;

        $scope.addSupplier =  response.data[4].add;
        $scope.deleteSupplier = response.data[4].delete; 
        $scope.editSupplier = response.data[4].edit; 
      } else {
        //admin
        $scope.addSupplier =  true;
        $scope.deleteSupplier = true; 
        $scope.editSupplier = true;
      }
    },function(response){
      console.log("Somthing went wrong");
    }); 



    MenuFac.active = 3;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;

    // Search for Supplier by all (name , email ,phone ... )
    $scope.searchSupplier = function(){
      if($scope.searchByAll == ""){
        $scope.init();
      } else {
        SuppliersServ.getSuppliersByAll($scope.searchByAll,$scope.pageSize,$scope.currentPage).then(function(response) {
          $scope.suppliers = response.data.result;
          $scope.total = response.data.count;
        }, function(response) {
          console.log("Something went wrong");
        });
      }
    }


    $scope.init = function () {
      SuppliersServ.getSuppliers($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.suppliers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا المورد";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      SuppliersServ.deleteSupplier(id).then(function(response) {
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
  app.controller('NewSupplierCtl',['$scope','$state','MenuFac','SuppliersServ','toastr',function($scope,$state,MenuFac,SuppliersServ,toastr){
    MenuFac.active = 3;
    $scope.activePanel = MenuFac;
    $scope.newSupplierForm = {};
    $scope.newSupplier = function(){
      SuppliersServ.addSupplier($scope.newSupplierForm).then(function(response) {
        if(response.data){
          $state.go('suppliers');
          toastr.success('تمت إضافة مورد جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditSupplierCtl',['$scope','$state','$stateParams','MenuFac','SuppliersServ','toastr',function($scope,$state,$stateParams,MenuFac,SuppliersServ,toastr){
    MenuFac.active = 3;
    $scope.activePanel = MenuFac;
    $scope.editSupplierForm = {};
    SuppliersServ.getSupplierByID($stateParams.id).then(function(response) {
      $scope.editSupplierForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    //44444
    $scope.editService = function(){
      SuppliersServ.editSupplier($stateParams.id,$scope.editSupplierForm).then(function(response) {
        if(response.data){
          $state.go('suppliers');
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