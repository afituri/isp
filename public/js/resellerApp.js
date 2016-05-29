(function(){
  'use strict';
  var app = angular.module('reseller',[
    'mgcrea.ngStrap',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'jcs-autoValidate',
    'toastr',
    'ui.bootstrap',
    'nya.bootstrap.select',
    'oc.lazyLoad'
  ]);
  app.config(['$stateProvider','$urlRouterProvider','$locationProvider','$popoverProvider','$modalProvider','toastrConfig','$datepickerProvider','$ocLazyLoadProvider',function($stateProvider,$urlRouterProvider,$locationProvider,$popoverProvider,$modalProvider,toastrConfig,$datepickerProvider,$ocLazyLoadProvider){
    $stateProvider.state('dashboard',{
      url: '/',
      templateUrl: 'pages/reseller/all/dashboard.html',
      controller: 'DashboardCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_reseller_controler_before',
            files: [
              '/js/resellerControllers.js',
            ] 
          }]);
        }] 
      }
    });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false).hashPrefix('!');
  }]);
}());