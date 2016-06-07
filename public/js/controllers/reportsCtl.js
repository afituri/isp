(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('ReportsCtl',['$scope','HelperServ',function($scope,HelperServ){
    HelperServ.getAllResellers();
    $scope.objects = HelperServ;
    $scope.results = [];
    $scope.showStatus = function(){

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