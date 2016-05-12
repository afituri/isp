(function(){
  'use strict';
  var app = angular.module('isp',[
    'mgcrea.ngStrap',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'jcs-autoValidate',
    'ngFileUpload',
    'toastr',
    'ui.bootstrap',
    'nya.bootstrap.select',
    'oc.lazyLoad'
  ]);
  app.config(['$stateProvider','$urlRouterProvider','$locationProvider','$popoverProvider','$modalProvider','toastrConfig','$datepickerProvider','$ocLazyLoadProvider',function($stateProvider,$urlRouterProvider,$locationProvider,$popoverProvider,$modalProvider,toastrConfig,$datepickerProvider,$ocLazyLoadProvider){
    $stateProvider.state('home',{
      url: '/',
      templateUrl: 'pages/home.html',
      controller: 'HomeCtl'
    })
    .state('resellers',{
      url: '/resellers',
      templateUrl: 'pages/resellers/resellers.html',
      controller: 'ResellersCtl',
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
    }).state('newReseller',{
      url: '/resellers/new',
      templateUrl: 'pages/resellers/newReseller.html',
      controller: 'NewResellerCtl',
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
    }).state('newCustomer',{
      url: '/customers/new',
      templateUrl: 'pages/customers/newCustomer.html',
      controller: 'NewCustomerCtl',
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
    }).state('newProductPolicy',{
      url: '/productPolicies/new',
      templateUrl: 'pages/productPolicies/newProductPolicy.html',
      controller: 'NewProductPolicyCtl',
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
    }).state('editProductPolicy',{
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
      templateUrl: 'pages/invoices/invoices.html',
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
    }).state('newInvoice',{
      url: '/invoices/new',
      templateUrl: 'pages/invoices/newInvoice.html',
      controller: 'NewInvoiceCtl',
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
    });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false).hashPrefix('!');
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
    $ocLazyLoadProvider.config({
        // global configs go here
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
      errorMessages['customerName'] = "الرجاء إدخال اسم العميل";
      errorMessages['customerRepName'] = "الرجاء إدخال اسم المندوب";
      errorMessages['notes'] = "الرجاء إدخال الملاحضة";
      errorMessages['type'] = "الرجاء اختيار نوع العميل";
      errorMessages['servicesProvider'] = "الرجاء اختيار مزود الخدمة";
      errorMessages['nameService'] = "الرجاء إدخال اسم الخدمة";
      errorMessages['discriptoinService'] = "الرجاء إدخال معلومات عن الخدمة";
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
  app.controller('HomeCtl',['$scope','MenuFac',function($scope,MenuFac){
    MenuFac.active = -1;
    $scope.activePanel = MenuFac;
  }]);
  app.controller('MenuCtl',['$scope','MenuFac',function($scope,MenuFac){
    $scope.activePanel = MenuFac;
  }]);
}());





