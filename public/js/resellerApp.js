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
    }) 
    .state('newCutomersPending',{
      url: '/newCutomersPending',
      templateUrl: 'pages/reseller/all/newCutomersPending.html',
      controller: 'NewCustomerPendingCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/resellerControllers.js',
            ] 
          }]);
        }] 
      }
    })
    .state('editCustomer',{
      url: '/customers/edit/:id',
      templateUrl: 'pages/customers/editCustomer.html',
      controller: 'EditCustomerCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/resellerControllers.js',
            ] 
          }]);
        }] 
      }
    })

      //customerReject
    .state('customerReject',{
      url: '/customerReject',
      templateUrl: 'pages/customers/customerReject.html',
      controller: 'CustomersRejectCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/resellerControllers.js',
            ] 
          }]);
        }] 
      }
    })

    .state('customersPending',{
      url: '/customersPending',
      templateUrl: 'pages/reseller/all/customersPending.html',
      controller: 'CustomersPendingCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/resellerControllers.js',
            ] 
          }]);
        }] 
      }
    })
     .state('paidInvoice',{
      url: '/invoiceCustomers/paid/:id',
      templateUrl: 'pages/invoices/paidInvoice.html',
      controller: 'PaidInvoiceCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/resellerControllers.js',
            ] 
          }]);
        }] 
      }
    })

    .state('invoices',{
      url: '/invoices',
      templateUrl: 'pages/reseller/all/invoices.html',
      controller: 'CustomersCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/resellerControllers.js',
            ] 
          }]);
        }] 
      }
    })
     .state('renewInvoice',{
      url: '/invoiceCustomers/renew/:id',
      templateUrl: 'pages/invoices/renewInvoice.html',
      controller: 'RenewInvoiceCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/resellerControllers.js',
            ] 
          }]);
        }] 
      }
    })
     .state('showInvoice',{
      url: '/showInvoice/:id',
      templateUrl: 'pages/invoices/showInvoice.html',
      controller: 'InvoicesCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/resellerControllers.js',
            ] 
          }]);
        }] 
      }
    })
    .state('newInvoice',{
      url: '/invoices/new',
      templateUrl: 'pages/reseller/all/newInvoice.html',
      controller: 'NewInvoiceCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
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