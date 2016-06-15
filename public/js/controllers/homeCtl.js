(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('HomeCtl',['$scope','MenuFac','CustomersServ','SuppliersServ',function($scope,MenuFac,CustomersServ,SuppliersServ){
    //alert("hii");
    MenuFac.active = -1;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
     CustomersServ.getCustomersCount().then(function(response) {
      console.log(response.data);
        $scope.customerNumber = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
      
      SuppliersServ.getSuppliersCount().then(function(response) {
        $scope.suppliersCount = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });


  }]);
}());