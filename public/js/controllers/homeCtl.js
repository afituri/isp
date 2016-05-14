(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('HomeCtl',['$scope','MenuFac',function($scope,MenuFac){
    MenuFac.active = -1;
    $scope.activePanel = MenuFac;
  }]);
}());