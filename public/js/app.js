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
    'ui.bootstrap'
  ]);
  app.config(['$stateProvider','$urlRouterProvider','$locationProvider','$popoverProvider','$modalProvider','toastrConfig','$datepickerProvider',function($stateProvider,$urlRouterProvider,$locationProvider,$popoverProvider,$modalProvider,toastrConfig,$datepickerProvider){
    $stateProvider.state('home',{
      url: '/',
      templateUrl: 'pages/home.html',
      controller: 'HomeCtl'
    })
    .state('resellers',{
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
    })
    .state('serviceProviders',{
      url: '/serviceProviders',
      templateUrl: 'pages/serviceProviders/serviceProviders.html',
      controller: 'ServiceProvidersCtl'
    })
    .state('invoice',{
      url: '/customer/report',
      templateUrl: 'pages/invoices/invoice.html',
      controller: 'NewInvoiceCtl'
    })

    .state('newServiceProvider',{
      url: '/serviceProviders/new',
      templateUrl: 'pages/serviceProviders/newServiceProvider.html',
      controller: 'NewServiceProviderCtl'
    }).state('editServiceProvider',{
      url: '/serviceProviders/edit/:id',
      templateUrl: 'pages/serviceProviders/editServiceProvider.html',
      controller: 'EditServiceProviderCtl'
    }).state('detailServiceProvider',{
      url: '/serviceProviders/:id/services',
      templateUrl: 'pages/serviceProviders/detailServiceProvider.html',
      controller: 'DetailServiceProviderCtl'
    })
    .state('services',{
      url: '/service',
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
    })
    .state('suppliers',{
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
    })
    .state('warehouses',{
      url: '/warehouses',
      templateUrl: 'pages/warehouses/warehouses.html',
      controller: 'WarehousesCtl'
    }).state('newWarehouse',{
      url: '/warehouses/new',
      templateUrl: 'pages/warehouses/newWarehouse.html',
      controller: 'NewWarehouseCtl'
    }).state('editWarehouse',{
      url: '/warehouses/edit/:id',
      templateUrl: 'pages/warehouses/editWarehouse.html',
      controller: 'EditWarehouseCtl'
    })
    .state('customers',{
      url: '/customers',
      templateUrl: 'pages/customers/customers.html',
      controller: 'CustomersCtl'
    // }).state('newCustomer',{
      // url: '/customers/new',
      // templateUrl: 'pages/customers/newCustomer.html',
      // controller: 'NewCustomerCtl'
    }).state('editCustomer',{
      url: '/customers/edit/:id',
      templateUrl: 'pages/customers/editCustomer.html',
      controller: 'EditCustomerCtl'
    })
    .state('productServices',{
      url: '/products/services',
      templateUrl: 'pages/products/productServices.html',
      controller: 'ProductServicesCtl'
    }).state('productItems',{
      url: '/products/items',
      templateUrl: 'pages/products/productItems.html',
      controller: 'ProductItemsCtl'
    }).state('productPackages',{
      url: '/products/packages',
      templateUrl: 'pages/products/productPackages.html',
      controller: 'ProductPackagesCtl'
    })
    .state('newProduct',{
      url: '/products/new',
      templateUrl: 'pages/products/newProduct.html',
      controller: 'NewProductCtl'
    })
    //00000
    .state('editProductService',{
      url: '/product/productService/edit/:id',
      templateUrl: 'pages/products/editService.html',
      controller: 'ProductServicesCtl'
    })

    .state('editProduct',{
      url: '/products/edit/:id',
      templateUrl: 'pages/products/editProduct.html',
      controller: 'EditProductCtl'
    })
    .state('policies',{
      url: '/policies',
      templateUrl: 'pages/policies/policies.html',
      controller: 'PoliciesCtl'
    }).state('newPolicy',{
      url: '/policies/new',
      templateUrl: 'pages/policies/newPolicy.html',
      controller: 'NewPolicyCtl'
    }).state('editPolicy',{
      url: '/policies/edit/:id',
      templateUrl: 'pages/policies/editPolicy.html',
      controller: 'EditPolicyCtl'
    })
    .state('productPolicies',{
      url: '/productPolicies',
      templateUrl: 'pages/productPolicies/productPolicies.html',
      controller: 'ProductPoliciesCtl'
    }).state('newProductPolicy',{
      url: '/productPolicies/new',
      templateUrl: 'pages/productPolicies/newProductPolicy.html',
      controller: 'NewProductPolicyCtl'
    }).state('editProductPolicy',{
      url: '/productPolicies/edit/:id',
      templateUrl: 'pages/productPolicies/editProductPolicy.html',
      controller: 'EditProductPolicyCtl'
    })
    .state('invoices',{
      url: '/invoices',
      templateUrl: 'pages/invoices/invoices.html',
      controller: 'InvoicesCtl'
    }).state('newInvoice',{
      url: '/invoices/new',
      templateUrl: 'pages/invoices/newInvoice.html',
      controller: 'NewInvoiceCtl'
    }).state('editInvoice',{
      url: '/invoices/edit/:id',
      templateUrl: 'pages/invoices/editInvoice.html',
      controller: 'EditInvoiceCtl'
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
}());





