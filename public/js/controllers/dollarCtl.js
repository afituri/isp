(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('DollarsCtl',['$scope','PermissionServ','$modal','DollarServ','$state','$timeout','CustomersServ','HelperServ','toastr',function($scope,PermissionServ,$modal,DollarServ,$state,$timeout,CustomersServ,HelperServ,toastr){
    PermissionServ.getSubpermission().then(function(response){
      $scope.permission =true;
        if(response.data[0] != undefined){
          //employee
          $scope.permission =false;
          $scope.addDollar =  response.data[0].add;
          $scope.deleteDollar = response.data[0].delete; 
        } else {
          //admin
          $scope.addDollar =  true;
          $scope.deleteDollar = true; 
        }

    },function(response){
      console.log("Somthing went wrong");
    });


    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا الدولار";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      DollarServ.deleteDollar(id).then(function(response) {
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
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
     $scope.init = function () {
     DollarServ.getDollar($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.dollars = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
   };
   $scope.init();
    $scope.newDollarForm = {};
    $scope.newDollar = function(){
      $scope.loadingStatus = true;
      DollarServ.addDollar($scope.newDollarForm).then(function(response) {
        if(response.data){
          $timeout(function () {
            $scope.newDollarForm.price=" ";
            toastr.success('تمت إضافة الدولار لهذا اليوم');
            $scope.init();
            $scope.loadingStatus = false;
          },3000);
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });      
    }
  }]);
}());