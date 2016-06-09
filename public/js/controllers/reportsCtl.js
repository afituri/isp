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
          console.log("response");
          $scope.results= response.data;
       }, function(response) {
        console.log("Something went wrong");
    });


      } else {

      }

    };
    $scope.printStatus = function(){

    };
    $scope.showDate = function(){

    };
    $scope.printDate = function(){

    };
    $scope.showReseller = function(){

    };
    $scope.printReseller = function(){

    };
  }]);
}());