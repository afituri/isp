(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('HomeCtl',['$scope','MenuFac','CustomersServ','SuppliersServ','ResllersServ','InvoicesServ',function($scope,MenuFac,CustomersServ,SuppliersServ,ResllersServ,InvoicesServ){
    MenuFac.active = -1;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
     CustomersServ.getCustomersCount().then(function(response) {
        $scope.customerNumber = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
     InvoicesServ.getNotification().then(function(response) {
        $scope.notificationCount = response.data.count;
        $scope.notification = response.data.result;
        console.log($scope.notification);
        console.log($scope.notificationCount);
      }, function(response) {
        console.log("Something went wrong");
      });
     CustomersServ.getAllMoney().then(function(response) {
        $scope.totalMoney = (response.data.sum).toFixed(2);
        $scope.totalPaid = (response.data.piad).toFixed(0);
        $scope.reminder = ((response.data.sum).toFixed(0)-(response.data.piad).toFixed(2));

      }, function(response) {
        console.log("Something went wrong");
      });
      
      SuppliersServ.getSuppliersCount().then(function(response) {
        $scope.suppliersCount = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });

      // all money 
      ResllersServ.getResellersCount().then(function(response) {
        $scope.ResellerCount = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });


  }]);
}());