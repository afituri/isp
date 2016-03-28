(function(){
  'use strict';
  var app = angular.module('isp',[
    'mgcrea.ngStrap',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'jcs-autoValidate',
    'ngFileUpload'
  ]);
  app.config(['$stateProvider','$urlRouterProvider','$locationProvider','$popoverProvider','$modalProvider',function($stateProvider,$urlRouterProvider,$locationProvider,$popoverProvider,$modalProvider){
    $stateProvider.state('home',{
      url: '/',
      templateUrl: 'pages/home.html',
      controller: 'HomeCtl'
    }).state('resellers',{
      url: '/resellers',
      templateUrl: 'pages/resellers.html',
      controller: 'ResellersCtl'
    }).state('NewResellerCtl',{
      url: '/resellers/new',
      templateUrl: 'pages/newReseller.html',
      controller: 'newResellerCtl'
    }).state('editReseller',{
      url: '/resellers/edit/:id',
      templateUrl: 'pages/editReseller.html',
      controller: 'EditResellerCtl'
    }).state('showReseller',{
      url: '/resellers/show/:id',
      templateUrl: 'pages/showReseller.html',
      controller: 'ShowResellerCtl'
    }).state('services',{
      url: '/services',
      templateUrl: 'pages/services.html',
      controller: 'ServicesCtl'
    }).state('newService',{
      url: '/services/new',
      templateUrl: 'pages/newServices.html',
      controller: 'NewServicesCtl'
    }).state('editService',{
      url: '/services/edit/:id',
      templateUrl: 'pages/editServices.html',
      controller: 'EditServicesCtl'
    });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false).hashPrefix('!');
    angular.extend($popoverProvider.defaults, {
      animation: 'am-flip-x',
      html: true
    });
    angular.extend($modalProvider.defaults, {
      animation: 'am-flip-x'
    });
  }]);
  app.run(['defaultErrorMessageResolver', function (defaultErrorMessageResolver){
    defaultErrorMessageResolver.setI18nFileRootPath('/lang');
    defaultErrorMessageResolver.setCulture('ar-ly');
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
      errorMessages['repName'] = "الرجاء إدخال اسم المخول";
      errorMessages['companyName'] = "الرجاء إدخال اسم الشىركة";
      errorMessages['city'] = "الرجاء إختيار المدينة";
      errorMessages['address'] = "الرجاء إدخال المنطقة";
      errorMessages['langtitude'] = "الرجاء إدخال خط الطول";
      errorMessages['longtitude'] = "الرجاء إدخال خط العرض";
      errorMessages['emailType'] = "الرجاء إدخال البريد الالكتروني";
      errorMessages['phone'] = "الرجاء إدخال رقم الهاتف";
      errorMessages['password'] = "الرجاء إدخال كلمة المرور";
      errorMessages['confirmPassword'] = "الرجاء إعادة إدخال كلمة المرور";
    });
  }]);
  app.filter('defaultLogo', function(){
    return function(input, param){
      if(!input){
        return param;
      }
      return input;
    };
  });
}());





