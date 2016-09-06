(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('WarehousesCtl',['$scope','PermissionServ','$modal','HelperServ','MenuFac','WarehousesServ','toastr',function($scope,PermissionServ,$modal,HelperServ,MenuFac,WarehousesServ,toastr){
     
    PermissionServ.getSubpermission().then(function(response){  
        $scope.permission =true;
        if(response.data[0] != undefined){
          console.log(response.data[6]);
          //employee
          $scope.permission =false;
 
          $scope.addWarehouse =  response.data[6].add;
          $scope.deleteWarehouse = response.data[6].delete; 
          $scope.editWarehouse = response.data[6].edit; 
        } else {
          //admin
          $scope.addWarehouse =  true;
          $scope.deleteWarehouse = true; 
          $scope.editWarehouse = true;
        }

    },function(response){
      console.log("Somthing went wrong");
    }); 



    $scope.searchWarehouses = function(){
       if($scope.searchByAll == ""){
        $scope.init();
      } else {
        WarehousesServ.search($scope.searchByAll,$scope.pageSize,$scope.currentPage).then(function(response) {
          $scope.warehouses = response.data.result;
          $scope.total = response.data.count;
        }, function(response) {
          console.log("Something went wrong");
        });
      }
    }

    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    HelperServ.getAllCities();
    $scope.cityObject = HelperServ;
    $scope.init = function () {
      WarehousesServ.getWarehouses($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.warehouses = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا المخزن";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      WarehousesServ.deleteWarehouse(id).then(function(response) {
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
  app.controller('NewWarehouseCtl',['$scope','$state','MenuFac','WarehousesServ','HelperServ','toastr',function($scope,$state,MenuFac,WarehousesServ,HelperServ,toastr){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    $scope.objects = HelperServ;
    $scope.newWarehouseForm = {};
    $scope.newWarehouse = function(){
      WarehousesServ.addWarehouse($scope.newWarehouseForm).then(function(response) {
        if(response.data){
          $scope.newWarehouseForm = {};
          $state.go('warehouses');
          toastr.success('تمت إضافة مخزن جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditWarehouseCtl',['$scope','$state','$stateParams','MenuFac','WarehousesServ','HelperServ','toastr',function($scope,$state,$stateParams,MenuFac,WarehousesServ,HelperServ,toastr){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    $scope.editWarehouseForm = {};
    $scope.objects = HelperServ;
    WarehousesServ.getWarehouseByID($stateParams.id).then(function(response) {
      $scope.editWarehouseForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editWarehouse = function(){
      WarehousesServ.editWarehouse($stateParams.id,$scope.editWarehouseForm).then(function(response) {
        if(response.data){
          $state.go('warehouses');
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