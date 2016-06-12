(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('ReportsCtl',['$scope','InvoicesServ','HelperServ',function($scope,InvoicesServ,HelperServ){
    HelperServ.getAllResellers();
    $scope.objects = HelperServ;
    $scope.results = [];

    $scope.showStatus = function(){
      if($scope.Active==1){
        // alert($scope.Active);
        InvoicesServ.active().then(function(response) {
          $scope.results= response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      } else {
          InvoicesServ.unActive().then(function(response) {
          console.log("response");
          $scope.results= response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      }
    };

    $scope.printStatus = function(){
      //alert($scope.Active);
       if($scope.Active==1){
        window.location.href ="/report/printActive";
      } else {
        window.location.href ="/report/printunActive";
      }

    };

     $scope.showDate = function(){
        InvoicesServ.contractBetweenDates($scope.startDate,$scope.endDate).then(function(response) {
          console.log("response");
          $scope.results= response.data;
        }, function(response) {
          console.log("Something went wrong");
        });

    };

    $scope.showReseller = function(){
       InvoicesServ.Byresseler($scope.reseller).then(function(response) {
          console.log("response");
          $scope.results= response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
    };


    
   
    $scope.printDate = function(){

    };
   
    $scope.printReseller = function(){

    };
  }]);
}());