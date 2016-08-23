(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('HomeCtl',['$scope','MenuFac','CustomersServ','PermissionServ','SuppliersServ','ResllersServ',function($scope,MenuFac,CustomersServ,PermissionServ,SuppliersServ,ResllersServ){
    $scope.Pages ={}
    $scope.dollarPage = "sss";
     PermissionServ.getSubpermission().then(function(response){
      //dollar
      $scope.dollarPage = response.data[0].all;
      //resselers
      $scope.resselersPage = response.data[1].all;
      console.log(response.data[2]);
      



      console.log(response.data[3]);
      console.log(response.data[4]);
      console.log(response.data[5]);


    },function(response){
      console.log("Somthing went wrong");
    });



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