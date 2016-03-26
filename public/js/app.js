(function(){
  'use strict';
  var app = angular.module('isp',[
    'mgcrea.ngStrap',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'jcs-autoValidate'
    ]);
  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider.state('home',{
      url: '/',
      templateUrl: 'pages/home.html',
      controller: 'HomeCtl'
    }).state('resellers',{
      url: '/resellers',
      templateUrl: 'pages/resellers.html',
      controller: 'ResellersCtl'
    }).state('newReseller',{
      url: '/resellers/new',
      templateUrl: 'pages/newReseller.html',
      controller: 'newResellerCtl'
    }).state('resellers.edit',{
      url: '/edit/:id',
      templateUrl: 'pages/home.html',
      controller: 'editResellerCtl'
    }).state('showReseller',{
      url: '/resellers/show/:id',
      templateUrl: 'pages/showReseller.html',
      controller: 'showResellerCtl'
    });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false).hashPrefix('!');
  }]);
  app.config(function($popoverProvider) {
    angular.extend($popoverProvider.defaults, {
      animation: 'am-flip-x',
      html: true
    });
  });
  app.run(['defaultErrorMessageResolver', function (defaultErrorMessageResolver){
    defaultErrorMessageResolver.setI18nFileRootPath('/lang');
    defaultErrorMessageResolver.setCulture('ar-ly');
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
      errorMessages['repName'] = "الرجاء إدخال اسم المخول";
      errorMessages['companyName'] = "الرجاء إدخال اسم الشىركة";
      errorMessages['city'] = "الرجاء إختيار المدينة";
      errorMessages['area'] = "الرجاء إدخال المنطقة";
      errorMessages['langtitude'] = "الرجاء إدخال خط الطول";
      errorMessages['longtitude'] = "الرجاء إدخال خط العرض";
      errorMessages['emailType'] = "الرجاء إدخال البريد الالكتروني";
      errorMessages['phone'] = "الرجاء إدخال رقم الهاتف";
      errorMessages['password'] = "الرجاء إدخال كلمة المرور";
      errorMessages['confirmPassword'] = "الرجاء إعادة إدخال كلمة المرور";
    });
  }]);
  app.factory('MenuFactory',function(){
    return {
      'activePanel': -1
    }
  });
  app.controller('HomeCtl',['$scope','$http',function($scope,$http){
  }]);
  app.controller('MenuCtl',['$scope','MenuFactory',function($scope,MenuFactory){
    $scope.activePanel = MenuFactory.activePanel;
  }]);
  app.controller('ResellersCtl',['$scope','$http','$state',function($scope,$http,$state){
    $http.get('/data')
      .then(function(response) {
        //First function handles success
        $scope.resellers = response.data;
        console.log(response.data);
      }, function(response) {
        //Second function handles error
        console.log("Something went wrong");
      });
    $scope.editReseller = function(id){
      $state.go('resellers.edit', {
        id: id
      });
    }
  }]);
  app.controller('newResellerCtl',['$scope','MenuFactory',function($scope,MenuFactory){
    $scope.newResllerForm = {};
    MenuFactory.activePanel = 0;
    $scope.newResller = function(){
      console.log("It's OK");
    }
  }]);
}());