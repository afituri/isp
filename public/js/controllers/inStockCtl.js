(function(){
  'use strict';
  var app = angular.module('isp');
  
  app.controller('NewInStockCtl',['$scope','$state','MenuFac','StockServ','HelperServ','toastr',function($scope,$state,MenuFac,StockServ,HelperServ,toastr){
   /* MenuFac.active = 5;
    $scope.activePanel = MenuFac;
    //objects
    $scope.objects=HelperServ;
    console.log($scope.objects.getAllStock);
    $scope.newInStockForm = {};
    $scope.objects = HelperServ;*/
   /* $scope.newInStock = function(){
      StockServ.addInStock($scope.newInStockForm).then(function(response) {
        if(response.data){
          $state.go('customers');
          toastr.success('تمت إضافة زبون جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };*/
  }]);








}());