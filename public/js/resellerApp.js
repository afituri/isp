(function(){
  'use strict';
  var app = angular.module('reseller',[
    'mgcrea.ngStrap',
    'ngSanitize',
    'ui.router',
    'jcs-autoValidate',
    'toastr',
    'ui.bootstrap',
    'nya.bootstrap.select',
    'oc.lazyLoad'
  ]);
  /* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
  app.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
    // global configs go here
    });
  }]);
  //AngularJS v1.3.x workaround for old style controller declarition in HTML
  app.config(['$controllerProvider', function($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
  }]);
  /* Setup global settings */
  app.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
      layout: {
        pageSidebarClosed: false, // sidebar menu state
        pageContentWhite: true, // set page content layout
        pageBodySolid: false, // solid body color state
        pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
      },
      layoutPath: 'assets'
    };
    $rootScope.settings = settings;
    return settings;
  }]);
  /* Setup App Main Controller */
  app.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
      App.initComponents(); // init core components
      //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
  }]);
  /* Setup Layout Part - Header */
  app.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
      Layout.initHeader(); // init header
    });
  }]);
  /* Setup Layout Part - Sidebar */
  app.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
      Layout.initSidebar(); // init sidebar
    });
  }]);
  /* Setup Layout Part - Footer */
  app.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
      Layout.initFooter(); // init footer
    });
  }]);
  /* Init global settings and run the app */
  app.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
  }]);
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
    .state('customerRejected',{
      url: '/customerRejected',
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

     //howInvoiceResellserPending.html
     .state('invoicesStatus',{
      url: '/invoicesStatus',
      templateUrl: 'pages/reseller/all/showInvoiceResellserPending.html',
      controller: 'invoicesStatus',
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
    angular.extend($popoverProvider.defaults, {
      animation: 'am-flip-x',
      html: true
    });
    angular.extend(toastrConfig, {
      positionClass: 'toast-top-left',
      progressBar: true,
      tapToDismiss: true
    });
    angular.extend($modalProvider.defaults, {
      animation: 'am-fade-and-scale',
      placement: 'center'
    });
    angular.extend($datepickerProvider.defaults, {
      dateFormat: 'd/M/yyyy',
      autoclose: true
    });
  }]);
}());