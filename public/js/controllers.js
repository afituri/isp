(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('HomeCtl',['$scope',function($scope){
  }]);
  app.controller('MenuCtl',['$scope','MenuFac',function($scope,MenuFac){
    $scope.activePanel = MenuFac;
  }]);
  app.controller('ResellersCtl',['$scope','ResllersServ','MenuFac',function($scope,ResllersServ,MenuFac){
    MenuFac.active = 0;
    $scope.resellers = ResllersServ;
  }]);
  app.controller('NewResellerCtl',['$scope','MenuFac',function($scope,MenuFac){
    MenuFac.active = 0;
    $scope.newResllerForm = {};
    $scope.newResller = function(){
      console.log($scope.newResllerForm);
    }
  }]);
  app.controller('EditResellerCtl',['$scope','$stateParams','ResllersServ','MenuFac',function($scope,$stateParams,ResllersServ,MenuFac){
    MenuFac.active = 0;
    $scope.editResllerForm = {};
    ResllersServ.getResellersByID($stateParams.id).then(function(response) {
      $scope.editResllerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  app.controller('ShowResellerCtl',['$scope','$stateParams','ResllersServ','MenuFac',function($scope,$stateParams,ResllersServ,MenuFac){
    MenuFac.active = 0;
    $scope.showResllerForm = {};
    ResllersServ.getResellersByID($stateParams.id).then(function(response) {
      $scope.showResllerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  // Service Providers Controllers Start
  app.controller('ServiceProvidersCtl',['$scope','MenuFac','ServiceProvidersServ',function($scope,MenuFac,ServiceProvidersServ){
    MenuFac.active = 1;
    $scope.activePanel = MenuFac;
    $scope.serviceProviders = ServiceProvidersServ;
  }]);
  app.controller('NewServiceProviderCtl',['$scope','MenuFac',function($scope,MenuFac){
    MenuFac.active = 1;
    $scope.activePanel = MenuFac;
  }]);
  app.controller('EditServiceProviderCtl',['$scope','$stateParams','MenuFac','ServiceProvidersServ',function($scope,$stateParams,MenuFac,ServiceProvidersServ){
    MenuFac.active = 1;
    $scope.activePanel = MenuFac;
    $scope.editServiceProviderForm = {};
    ServiceProvidersServ.getServiceProviderByID($stateParams.id).then(function(response) {
      $scope.editServiceProviderForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  app.controller('DetailServiceProviderCtl',['$scope','$stateParams','MenuFac','ServiceProvidersServ',function($scope,$stateParams,MenuFac,ServiceProvidersServ){
    MenuFac.active = 1;
    $scope.activePanel = MenuFac;
    $scope.services = {};
    $scope.detailServiceProvidersForm = {};
    ServiceProvidersServ.getServiceProviderByID($stateParams.id).then(function(response) {
      $scope.detailServiceProviderForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    ServiceProvidersServ.getServiceProvidersServicesByID($stateParams.id).then(function(response) {
      $scope.services = response.data;
      console.log(response.data);
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  // Service Providers Controllers End
  // Service Controllers Start
  app.controller('ServicesCtl',['$scope','MenuFac','ServicesServ',function($scope,MenuFac,ServicesServ){
    MenuFac.active = 2;
    $scope.activePanel = MenuFac;
    $scope.services = ServicesServ;
  }]);
  app.controller('NewServiceCtl',['$scope','MenuFac','ServiceProvidersServ',function($scope,MenuFac,ServiceProvidersServ){
    MenuFac.active = 2;
    $scope.activePanel = MenuFac;
    $scope.serviceProviders = ServiceProvidersServ;
  }]);
  app.controller('EditServiceCtl',['$scope','$stateParams','MenuFac','ServicesServ','ServiceProvidersServ',function($scope,$stateParams,MenuFac,ServicesServ,ServiceProvidersServ){
    MenuFac.active = 2;
    $scope.activePanel = MenuFac;
    $scope.editServiceForm = {};
    $scope.serviceProviders = ServiceProvidersServ;
    ServicesServ.getServiceByID($stateParams.id).then(function(response) {
      $scope.editServiceForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  // Service Controllers End
  // Suppliers Controllers Start
  app.controller('SuppliersCtl',['$scope','MenuFac','SuppliersServ',function($scope,MenuFac,SuppliersServ){
    MenuFac.active = 3;
    $scope.activePanel = MenuFac;
    $scope.suppliers = SuppliersServ;
  }]);
  app.controller('NewSupplierCtl',['$scope','MenuFac',function($scope,MenuFac){
    MenuFac.active = 3;
    $scope.activePanel = MenuFac;
  }]);
  app.controller('EditSupplierCtl',['$scope','$stateParams','MenuFac','SuppliersServ',function($scope,$stateParams,MenuFac,SuppliersServ){
    MenuFac.active = 3;
    $scope.activePanel = MenuFac;
    $scope.editSupplierForm = {};
    SuppliersServ.getSupplierByID($stateParams.id).then(function(response) {
      $scope.editSupplierForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  // Suppliers Controllers End
  // Warehouses Controllers Start
  app.controller('WarehousesCtl',['$scope','MenuFac','WarehousesServ',function($scope,MenuFac,WarehousesServ){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    $scope.warehouses = WarehousesServ;
  }]);
  app.controller('NewWarehouseCtl',['$scope','MenuFac',function($scope,MenuFac){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
  }]);
  app.controller('EditWarehouseCtl',['$scope','$stateParams','MenuFac','WarehousesServ',function($scope,$stateParams,MenuFac,WarehousesServ){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    $scope.editWarehouseForm = {};
    WarehousesServ.getWarehouseByID($stateParams.id).then(function(response) {
      $scope.editWarehouseForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  // Warehouses Controllers End
  // Customers Controllers End
  app.controller('CustomersCtl',['$scope','MenuFac','CustomersServ',function($scope,MenuFac,CustomersServ){
    MenuFac.active = 5;
    $scope.activePanel = MenuFac;
    $scope.customers = CustomersServ;
  }]);
  app.controller('NewCustomerCtl',['$scope','MenuFac','CustomersServ',function($scope,MenuFac,CustomersServ){
    MenuFac.active = 5;
    $scope.activePanel = MenuFac;
    $scope.newCustomerForm = {};
    $scope.newCustomer = function(){
      CustomersServ.addCustomer($scope.newCustomerForm).then(function(response) {
        console.log(response.data);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditCustomerCtl',['$scope','$stateParams','MenuFac','CustomersServ',function($scope,$stateParams,MenuFac,CustomersServ){
    MenuFac.active = 5;
    $scope.activePanel = MenuFac;
    $scope.editCustomerForm = {};
    CustomersServ.getCustomerByID($stateParams.id).then(function(response) {
      $scope.editCustomerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  // Customers Controllers End
}())