var app = angular.module("IspApp", [
  "ui.router", 
  "ui.bootstrap", 
  "oc.lazyLoad",  
  "ngSanitize"
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
/* Setup Rounting For All Pages */
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  // Redirect any unmatched url
  $urlRouterProvider.otherwise("/dashboard");  
  $stateProvider
  // Dashboard
  .state('dashboard', {
    url: "/",
    templateUrl: "pages/dashboard.html",            
    data: {pageTitle: 'لوحة التحكم'},
    controller: "DashboardController",
    resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
          files: [
            'morris.js/morris.css',                            
            'morris.js/morris.min.js',
            'raphael/raphael.min.js',                            
            'assets/js/jquery.sparkline.min.js',
            'assets/js/dashboard.js',
            'js/controllers/DashboardController.js',
          ] 
        });
      }]
    }
  })
  .state('dollar',{
    url: '/dollar',
    templateUrl: 'pages/dollar/dollar.html',
    data: {pageTitle: 'تسجيل الدولار'},
    controller: 'DollarsCtl',
    resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load([{
          insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
          files: [
            'js/controllers/dollarCtl.js',
          ] 
        }]);
      }] 
    }
  })   
}]);
/* Init global settings and run the app */
app.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
  $rootScope.$state = $state; // state to be accessed from view
  $rootScope.$settings = settings; // state to be accessed from view
}]);