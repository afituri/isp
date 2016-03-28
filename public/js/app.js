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
      templateUrl: 'pages/resellers/resellers.html',
      controller: 'ResellersCtl'
    }).state('newReseller',{
      url: '/resellers/new',
      templateUrl: 'pages/resellers/newReseller.html',
      controller: 'NewResellerCtl'
    }).state('editReseller',{
      url: '/resellers/edit/:id',
      templateUrl: 'pages/resellers/editReseller.html',
      controller: 'EditResellerCtl'
    }).state('showReseller',{
      url: '/resellers/show/:id',
      templateUrl: 'pages/resellers/showReseller.html',
      controller: 'ShowResellerCtl'
    }).state('serviceProviders',{
      url: '/serviceProviders',
      templateUrl: 'pages/serviceProviders/serviceProviders.html',
      controller: 'ServiceProvidersCtl'
    }).state('newServiceProvider',{
      url: '/serviceProviders/new',
      templateUrl: 'pages/serviceProviders/newServiceProvider.html',
      controller: 'NewServiceProviderCtl'
    }).state('editServiceProvider',{
      url: '/serviceProviders/edit/:id',
      templateUrl: 'pages/serviceProviders/editServiceProvider.html',
      controller: 'EditServiceProviderCtl'
    }).state('services',{
      url: '/services',
      templateUrl: 'pages/services/services.html',
      controller: 'ServicesCtl'
    }).state('newService',{
      url: '/services/new',
      templateUrl: 'pages/services/newService.html',
      controller: 'NewServiceCtl'
    }).state('editService',{
      url: '/services/edit/:id',
      templateUrl: 'pages/services/editService.html',
      controller: 'EditServiceCtl'
    }).state('suppliers',{
      url: '/suppliers',
      templateUrl: 'pages/suppliers/suppliers.html',
      controller: 'SuppliersCtl'
    }).state('newSupplier',{
      url: '/suppliers/new',
      templateUrl: 'pages/suppliers/newSupplier.html',
      controller: 'NewSupplierCtl'
    }).state('editSupplier',{
      url: '/suppliers/edit/:id',
      templateUrl: 'pages/suppliers/editSupplier.html',
      controller: 'EditSupplierCtl'
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





