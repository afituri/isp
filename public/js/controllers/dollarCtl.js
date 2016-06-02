(function(){
  'use strict';
  var app = angular.module('isp');

  //newDollar
  //DollarsCtl
  
  app.controller('DollarsCtl',['$scope','$modal','DollarServ','$state','MenuFac','CustomersServ','HelperServ','toastr',function($scope,$modal,DollarServ,$state,MenuFac,CustomersServ,HelperServ,toastr){
    
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





    MenuFac.active = 6;
    $scope.activePanel = MenuFac;
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
     DollarServ.addDollar($scope.newDollarForm).then(function(response) {
        if(response.data){
          $state.go('dollar');
          $scope.newDollarForm.price=" ";
          toastr.success('تمت إضافة الدولار لهذا اليوم');
          $scope.init();
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });      
    }

  }]);


  }());