(function(){
  'use strict';
  var app = angular.module('isp',[
    'mgcrea.ngStrap',
    'ngSanitize',
    'ui.router',
    'jcs-autoValidate',
    'ngFileUpload',
    'toastr',
    'ui.bootstrap',
    'nya.bootstrap.select',
    'oc.lazyLoad',
    'ngCsvImport',
    'angular-ladda',
    'remoteValidation'
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
  app.config(['$stateProvider','$urlRouterProvider','$locationProvider','$popoverProvider','$modalProvider','toastrConfig','$datepickerProvider','$ocLazyLoadProvider',function($stateProvider,$urlRouterProvider,$locationProvider,$popoverProvider,$modalProvider,toastrConfig,$datepickerProvider,$ocLazyLoadProvider){
    $stateProvider.state('dashboard', {
      url: '/',
      templateUrl: "pages/dashboard.html",            
      data: {pageTitle: 'لوحة التحكم'},
      controller: "HomeCtl",
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
              'js/controllers/homeCtl.js',
            ] 
          });
        }]
      }
    })

    .state('notice',{
      url: '/notice',
      templateUrl: 'pages/notices/notices.html',
      controller: 'noticeCtl',
      data: {pageTitle: 'تنبيه عام'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/noticeCtl.js',
            ] 
          }]);
        }] 
      }
      
    })

    .state('newNotice',{
      url: '/newNotice',
      templateUrl: 'pages/notices/newNotice.html',
      controller: 'newNoticeCtl',
      data: {pageTitle: 'تنبيه عام'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/noticeCtl.js',
            ] 
          }]);
        }] 
      }
      
    })






    .state('resellers',{
      url: '/resellers',
      templateUrl: 'pages/resellers/resellers.html',
      controller: 'ResellersCtl',
      data: {pageTitle: 'عرض الموزعين'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/resellersCtl.js',
            ] 
          }]);
        }] 
      }
    })

    .state('newPermissions',{
      url: '/newPermissions',
      templateUrl: 'pages/permissions/newPermissions.html',
      controller: 'newPermissionCtl',
      data: {pageTitle: 'إضافة الصلاحيات'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/permissionCtl.js',
            ] 
          }]);
        }] 
      }
    })

    .state('editPermissions',{
      url: '/editPermissions/edit/:id',
      templateUrl: 'pages/permissions/editPermissions.html',
      controller: 'editPermissionCtl',
      data: {pageTitle: 'إضافة الصلاحيات'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/permissionCtl.js',
            ] 
          }]);
        }] 
      }
    })
    //permissions
    .state('permissions',{
      url: '/permissions',
      templateUrl: 'pages/permissions/permissions.html',
      controller: 'permissionCtl',
      data: {pageTitle: 'عرض الصلاحيات'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/permissionCtl.js',
            ] 
          }]);
        }] 
      }
    })


    .state('dollar',{
      url: '/dollar',
      templateUrl: 'pages/dollar/dollar.html',
      controller: 'DollarsCtl',
      data: {pageTitle: 'تسجيل الدولار'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/dollarCtl.js',
            ] 
          }]);
        }] 
      }
      
    })
    .state('restore',{
      url: '/restore',
      templateUrl: 'pages/restore/restore.html',
      controller: 'RestoreCtl',
      data: {pageTitle: 'استعادة'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/restoreCtl.js',
            ] 
          }]);
        }] 
      }
      
    })
    .state('newReseller',{
      url: '/resellers/new',
      templateUrl: 'pages/resellers/newReseller.html',
      controller: 'NewResellerCtl',
      data: {pageTitle: 'اضافة موزع جديد'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/resellersCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('editReseller',{
      url: '/resellers/edit/:id',
      templateUrl: 'pages/resellers/editReseller.html',
      controller: 'EditResellerCtl',
      data: {pageTitle: 'تعديل الموزع'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/resellersCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('showReseller',{
      url: '/resellers/show/:id',
      templateUrl: 'pages/resellers/showReseller.html',
      controller: 'ShowResellerCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/resellersCtl.js',
            ] 
          }]);
        }] 
      }
    })
  
    .state('serviceProviders',{
      url: '/serviceProviders',
      templateUrl: 'pages/serviceProviders/serviceProviders.html',
      controller: 'ServiceProvidersCtl',
      data: {pageTitle: 'عرض مزودي الخدمة'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/serviceProvidersCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('newServiceProvider',{
      url: '/serviceProviders/new',
      templateUrl: 'pages/serviceProviders/newServiceProvider.html',
      controller: 'NewServiceProviderCtl',
      data: {pageTitle: 'إضافة مزود خدمة جديد'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/serviceProvidersCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('editServiceProvider',{
      url: '/serviceProviders/edit/:id',
      templateUrl: 'pages/serviceProviders/editServiceProvider.html',
      controller: 'EditServiceProviderCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/serviceProvidersCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('detailServiceProvider',{
      url: '/serviceProviders/:id/services',
      templateUrl: 'pages/serviceProviders/detailServiceProvider.html',
      controller: 'DetailServiceProviderCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/serviceProvidersCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('services',{
      url: '/service',
      templateUrl: 'pages/services/services.html',
      controller: 'ServicesCtl',
      data: {pageTitle: 'عرض الخدمات'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/servicesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('newService',{
      url: '/services/new',
      templateUrl: 'pages/services/newService.html',
      controller: 'NewServiceCtl',
      data: {pageTitle: 'إضافة خدمة جديدة'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/servicesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('editService',{
      url: '/services/edit/:id',
      templateUrl: 'pages/services/editService.html',
      controller: 'EditServiceCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/servicesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('suppliers',{
      url: '/suppliers',
      templateUrl: 'pages/suppliers/suppliers.html',
      controller: 'SuppliersCtl',
      data: {pageTitle: 'عرض الموردين'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/suppliersCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('newSupplier',{
      url: '/suppliers/new',
      templateUrl: 'pages/suppliers/newSupplier.html',
      controller: 'NewSupplierCtl',
      data: {pageTitle: 'إضافة مورد جديد'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/suppliersCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('editSupplier',{
      url: '/suppliers/edit/:id',
      templateUrl: 'pages/suppliers/editSupplier.html',
      controller: 'EditSupplierCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/suppliersCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('warehouses',{
      url: '/warehouses',
      templateUrl: 'pages/warehouses/warehouses.html',
      controller: 'WarehousesCtl',
      data: {pageTitle: 'عرض المخازن'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/warehousesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('newWarehouse',{
      url: '/warehouses/new',
      templateUrl: 'pages/warehouses/newWarehouse.html',
      controller: 'NewWarehouseCtl',
      data: {pageTitle: 'إضافة مخزن جديد'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/warehousesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('editWarehouse',{
      url: '/warehouses/edit/:id',
      templateUrl: 'pages/warehouses/editWarehouse.html',
      controller: 'EditWarehouseCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/warehousesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('customers',{
      url: '/customers',
      templateUrl: 'pages/customers/customers.html',
      controller: 'CustomersCtl',
      data: {pageTitle: 'عرض الزبائن'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/customersCtl.js',
            ] 
          }]);
        }] 
      }
    })
  

    .state('customerPending',{
      url: '/customerPending',
      templateUrl: 'pages/customers/customerPendingConfirm.html',
      controller: 'CustomerPendingCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/customersCtl.js',
            ] 
          }]);
        }] 
      }
    })
    
    .state('showInvoicePending',{
      url: '/showInvoicePending',
      templateUrl: 'pages/invoices/showInvoicePending.html',
      controller: 'InvoicesCtlPending',
      data: {pageTitle: 'عرض الفواتير قيد الانتظار'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/invoicesCtl.js',
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
              '/js/controllers/invoicesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('invoiceCustomer',{
      url: '/invoiceCustomers',
      templateUrl: 'pages/invoices/customers.html',
      controller: 'CustomersCtl',
      data: {pageTitle: 'عرض الزبائن'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/customersCtl.js',
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
              '/js/controllers/invoicesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    //statistics

     .state('statistics',{
      url: '/statistics',
      templateUrl: 'pages/reports/statistics.html',
      controller: 'stCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/invoicesCtl.js',
            ] 
          }]);
        }] 
      }
    })


    .state('upgreade',{
      url: '/invoiceCustomers/upgreade/:id',
      templateUrl: 'pages/invoices/upgreade.html',
      controller: 'UpgreadeCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/invoicesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('addGiga',{
      url: '/invoiceCustomers/addGiga/:id',
      templateUrl: 'pages/invoices/addGiga.html',
      controller: 'Giga',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/invoicesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('Replacement',{
      url: '/invoiceCustomers/Replacement/:id',
      templateUrl: 'pages/invoices/Replacement.html',
      controller: 'UpgreadeCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/invoicesCtl.js',
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
              '/js/controllers/invoicesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('newCustomer',{
      url: '/customers/new',
      templateUrl: 'pages/customers/newCustomer.html',
      controller: 'NewCustomerCtl',
      data: {pageTitle: 'إضافة عميل جديد'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/customersCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('editCustomer',{
      url: '/customers/edit/:id',
      templateUrl: 'pages/customers/editCustomer.html',
      controller: 'EditCustomerCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/customersCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('productServices',{
      url: '/products/services',
      templateUrl: 'pages/products/productServices.html',
      controller: 'ProductServicesCtl',
      data: {pageTitle: 'عرض المنتجات (خدمات)'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productServicesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('productItems',{
      url: '/products/items',
      templateUrl: 'pages/products/productItems.html',
      controller: 'ProductItemsCtl',
      data: {pageTitle: 'عرض المنتجات (معدات)'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productServicesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('productPackages',{
      url: '/products/packages',
      templateUrl: 'pages/products/productPackages.html',
      controller: 'ProductPackagesCtl',
      data: {pageTitle: 'عرض المنتجات (حزم)'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productServicesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('productOtherEquipments',{
      url: '/products/otherEquipments',
      templateUrl: 'pages/products/productOtherEquipment.html',
      controller: 'ProductOtherEquipmentCtl',
      data: {pageTitle: 'عرض المنتجات (معدات اخري)'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productServicesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('newProduct',{
      url: '/products/new',
      templateUrl: 'pages/products/newProduct.html',
      controller: 'NewProductCtl',
      data: {pageTitle: 'إضافة منتج جديد'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productServicesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('editProductService',{
      url: '/product/productService/edit/:id',
      templateUrl: 'pages/products/editService.html',
      controller: 'ProductServicesCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productServicesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('editProductPackages',{
      url: '/products/ProductPackages/edit/:id',
      templateUrl: 'pages/products/editProductPackages.html',
      controller: 'ProductPackagesCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productServicesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('editProductItems',{
      url: '/product/productItems/edit/:id',
      templateUrl: 'pages/products/editProductItem.html',
      controller: 'ProductItemsCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productServicesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('editProductOtherEquipment',{
      url: '/product/productOtherEquipments/edit/:id',
      templateUrl: 'pages/products/editProductOtherEquipment.html',
      controller: 'EditProductOtherEquipmentsCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productServicesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('editProduct',{
      url: '/products/edit/:id',
      templateUrl: 'pages/products/editProduct.html',
      controller: 'EditProductCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productServicesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('policies',{
      url: '/policies',
      templateUrl: 'pages/policies/policies.html',
      controller: 'PoliciesCtl',
      data: {pageTitle: 'عرض السياسات'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/policiesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('newPolicy',{
      url: '/policies/new',
      templateUrl: 'pages/policies/newPolicy.html',
      controller: 'NewPolicyCtl',
      data: {pageTitle: 'إضافة سياسة جديدة'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/policiesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('editPolicy',{
      url: '/policies/edit/:id',
      templateUrl: 'pages/policies/editPolicy.html',
      controller: 'EditPolicyCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/policiesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('productPolicies',{
      url: '/productPolicies',
      templateUrl: 'pages/productPolicies/productPolicies.html',
      controller: 'ProductPoliciesCtl',
     resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productPoliciesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    //productPoliciesService
    .state('productPoliciesService',{
      url: '/productPoliciesService',
      templateUrl: 'pages/productPolicies/productPoliciesService.html',
      controller: 'ProductPoliciesServiceCtl',
      data: {pageTitle: 'عرض سياسات منتج (الخدمة)'},
     resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productPoliciesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    //productPoliciesItem
    .state('productPoliciesItem',{
      url: '/productPoliciesItem',
      templateUrl: 'pages/productPolicies/productPoliciesItem.html',
      controller: 'ProductPoliciesItemCtl',
      data: {pageTitle: 'عرض سياسات منتج (المعدة)'},
     resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productPoliciesCtl.js',
            ] 
          }]);
        }] 
      }
    })

    // editProductPoliciesPackage.html
    .state('editProductPoliciesPackage',{
      url: '/editProductPoliciesPackage/:id',
      templateUrl: 'pages/productPolicies/editProductPoliciesPackage.html',
      controller: 'ProductPoliciesPackageCtl',
     resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productPoliciesCtl.js',
            ] 
          }]);
        }] 
      }
    })


    //editProductPoliciesService
    .state('editProductPoliciesService',{
      url: '/editProductPoliciesService/:id',
      templateUrl: 'pages/productPolicies/editProductPoliciesService.html',
      controller: 'ProductPoliciesServiceCtl',
     resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productPoliciesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('editProductPoliciesItem',{
      url: '/editProductPoliciesItem/:id',
      templateUrl: 'pages/productPolicies/editProductPoliciesItem.html',
      controller: 'ProductPoliciesItemCtl',
     resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productPoliciesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('productPoliciesPackage',{
      url: '/productPoliciesPackage',
      templateUrl: 'pages/productPolicies/productPoliciesPackage.html',
      controller: 'ProductPoliciesPackageCtl',
      data: {pageTitle: 'عرض سياسات منتج (الحزمة)'},
     resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productPoliciesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('newProductPolicy',{
      url: '/productPolicies/new',
      templateUrl: 'pages/productPolicies/newProductPolicy.html',
      controller: 'NewProductPolicyCtl',
      data: {pageTitle: 'إضافة منتج جديد'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productPoliciesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('newInStock',{
      url: '/instock/new',
      templateUrl: 'pages/inStock/newInStock.html',
      controller: 'NewInStockCtl',
      data: {pageTitle: 'إضافة مخزون جديد'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/inStockCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('inStock',{
      url: '/instock',
      templateUrl: 'pages/inStock/inStock.html',
      controller: 'inStockCtl',
      data: {pageTitle: 'عرض المخزون'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/inStockCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('Transfer',{
      url: '/instock/Transfer',
      templateUrl: 'pages/inStock/Transfer.html',
      controller: 'TransferCtl',
      data: {pageTitle: 'نقل مخزون'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/inStockCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('editInStock',{
      url: '/inStock/edit/:id',
      templateUrl: 'pages/inStock/editInStock.html',
      controller: 'inStockCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/inStockCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('editProductPolicy',{
      url: '/productPolicies/edit/:id',
      templateUrl: 'pages/productPolicies/editProductPolicy.html',
      controller: 'EditProductPolicyCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/productPoliciesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('invoices',{
      url: '/invoices',
      templateUrl: 'pages/invoices/invoice.html',
      controller: 'InvoicesCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/invoicesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    .state('newUser',{
      url: '/newUser',
      templateUrl: 'pages/users/newUser.html',
      controller: 'NewUserCtl',
      data: {pageTitle: 'إضافة موظف'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/usersCtl.js',
            ] 
          }]);
        }] 
      }
    })

    .state('user',{
      url: '/user',
      templateUrl: 'pages/users/users.html',
      controller: 'UserCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/usersCtl.js',
            ] 
          }]);
        }] 
      }
    })

    .state('newInvoice',{
      url: '/invoices/new',
      templateUrl: 'pages/invoices/newInvoice.html',
      controller: 'NewInvoiceCtl',
      data: {pageTitle: 'إضافة فاتورة جديدة'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/invoicesCtl.js',
            ] 
          }]);
        }] 
      }
    }).state('editInvoice',{
      url: '/invoices/edit/:id',
      templateUrl: 'pages/invoices/editInvoice.html',
      controller: 'EditInvoiceCtl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/invoicesCtl.js',
            ] 
          }]);
        }] 
      }
    })
    //searchMacAdress
    .state('searchMacAdress',{
      url: '/searchMacAdress',
      templateUrl: 'pages/reports/searchMacAdress.html',
      controller: 'ReportsCtl',
      data: {pageTitle: 'البحث عن الماك ادرس'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/reportsCtl.js',
            ] 
          }]);
        }] 
      }
    })
    //searchByMacAdress
    .state('searchByMacAdress',{
      url: '/searchByMacAdress',
      templateUrl: 'pages/reports/searchByMacAdress.html',
      controller: 'ReportsCtl',
      data: {pageTitle: 'البحث بالماك ادرس / سيريال'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/reportsCtl.js',
            ] 
          }]);
        }] 
      }
    })

    .state('reports',{
      url: '/reports',
      templateUrl: 'pages/reports/reports.html',
      controller: 'ReportsCtl',
      data: {pageTitle: 'المفعلين والغير مفعلين'},
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            insertBefore: '#ng_load_controler_before', // load the above js files before '#ng_load_plugins_before'
            files: [
              '/js/controllers/reportsCtl.js',
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
      animation: 'animated zoomIn',
      placement: 'center'
    });
    angular.extend($datepickerProvider.defaults, {
      dateFormat: 'd/M/yyyy',
      autoclose: true
    });
    $ocLazyLoadProvider.config({
        // global configs go here
    });
  }]);
  /* Init global settings and run the app */
  app.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
  }]);
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
      errorMessages['repPhone'] = "الرجاء إدخال رقم هاتف المخول";
      errorMessages['password'] = "الرجاء إدخال كلمة المرور";
      errorMessages['confirmPassword'] = "الرجاء إعادة إدخال كلمة المرور";
      errorMessages['customerName'] = "الرجاء إدخال اسم العميل";
      errorMessages['customerRepName'] = "الرجاء إدخال اسم المندوب";
      errorMessages['notes'] = "الرجاء إدخال الملاحضة";
      errorMessages['type'] = "الرجاء اختيار نوع العميل";
      errorMessages['servicesProvider'] = "الرجاء اختيار مزود الخدمة";
      errorMessages['nameService'] = "الرجاء إدخال اسم الخدمة";
      errorMessages['discriptoinService'] = "الرجاء إدخال معلومات عن الخدمة";
      errorMessages['warehouseName'] = "الرجاء إدخال اسم المخزن";
      errorMessages['customerName'] = 'الرجاء ادخال اسم العميل';
      errorMessages['matchVerify'] = 'كلمة المرور ليست متطابقة';
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
  app.controller('MenuCtl',['$scope','MenuFac',function($scope,MenuFac){
    $scope.activePanel = MenuFac;
  }]);
  app.controller('NotifcationCtr',['$scope','HelperServ',function($scope,HelperServ){
    $scope.notif=['إضافة فاتورة','إضافة فاتورة مبدئية','تجديد','دفعة'];
    $scope.getAllNotification = HelperServ;
    $scope.getAllNotification.getNotification();
    // for(;;){
    //   window.setTimeout(function(){
    //     // $scope.getAllNotification.getNotification();
    //     console.log('Hi');
    //   },10000);
    // }
    // $scope.notificationCount = $scope.getAllNotification.notificationObj.count;
    // $scope.$watch('notificationCount', function() {
    //     alert('hey, myVar has changed!');
    // });
    // HelperServ.getNotification().then(function(response) {
    //   $scope.notificationCount = response.data.count;
    //   $scope.notification = response.data.result;
    //   console.log($scope.notification);
    //   console.log($scope.notificationCount);
    // }, function(response) {
    //   console.log("Something went wrong");
    // });
  }]);
}());