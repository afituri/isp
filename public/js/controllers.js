(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('HomeCtl',['$scope',function($scope){
  }]);
  app.controller('MenuCtl',['$scope','MenuFactory',function($scope,MenuFactory){
    $scope.activePanel = MenuFactory;
  }]);
  app.controller('ResellersCtl',['$scope','ResllersService','MenuFactory',function($scope,ResllersService,MenuFactory){
    MenuFactory.active = 0;
    $scope.resellers = ResllersService;
  }]);
  app.controller('NewResellerCtl',['$scope','MenuFactory',function($scope,MenuFactory){
    MenuFactory.active = 0;
    $scope.newResllerForm = {};
    $scope.newResller = function(){
      console.log($scope.newResllerForm);
    }
  }]);
  app.controller('EditResellerCtl',['$scope','$stateParams','ResllersService','MenuFactory',function($scope,$stateParams,ResllersService,MenuFactory){
    MenuFactory.active = 0;
    $scope.editResllerForm = {};
    ResllersService.getResellersByID($stateParams.id).then(function(response) {
      $scope.editResllerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  app.controller('ShowResellerCtl',['$scope','$stateParams','ResllersService','MenuFactory',function($scope,$stateParams,ResllersService,MenuFactory){
    MenuFactory.active = 0;
    $scope.showResllerForm = {};
    ResllersService.getResellersByID($stateParams.id).then(function(response) {
      $scope.showResllerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  app.controller('ServicesCtl',['$scope','MenuFactory','ServicesService',function($scope,MenuFactory,ServicesService){
    MenuFactory.active = 1;
    $scope.activePanel = MenuFactory;
    $scope.services = ServicesService;
  }]);
  app.controller('NewServicesCtl',['$scope','MenuFactory',function($scope,MenuFactory){
    MenuFactory.active = 1;
    $scope.activePanel = MenuFactory;
  }]);
  app.controller('EditServicesCtl',['$scope','$stateParams','MenuFactory','ServicesService',function($scope,$stateParams,MenuFactory,ServicesService){
    MenuFactory.active = 1;
    $scope.activePanel = MenuFactory;
    $scope.editServicesForm = {};
    ServicesService.getServiceByID($stateParams.id).then(function(response) {
      $scope.editServicesForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
}())