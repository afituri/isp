(function(){
  'use strict';
  var app = angular.module('isp',[
    'mgcrea.ngStrap',
    'ngAnimate',
    'ui.router',
    'jcs-autoValidate'
    ]);
  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider.state('home',{
      url: '/',
      templateUrl: 'pages/home.html',
      controller: 'HomeCtl'
    });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false).hashPrefix('!');
  }]);
  app.controller('HomeCtl',['$scope','$http',function($scope,$http){
    
  }]);
}());