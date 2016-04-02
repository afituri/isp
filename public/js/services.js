(function(){
  'use strict';
  var app = angular.module('isp');
  app.factory('MenuFac',function(){
    return {
      'active': -1
    }
  });
  app.service('ResllersServ',['$http',function($http){
    var self = {
      'resellersObj': [],
      'getResellers': function(){
        $http.get('/reseller').then(function(response) {
          self.resellersObj = response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      },
      'getResellersByID': function(id){
        return $http.get('/reseller/:id');
      },
      'addResller': function(Resller){
        return $http.post('/reseller/add',Resller);
      }
    };
    self.getResellers();
    return self;
  }]);
  app.service('ServiceProvidersServ',['$http',function($http){
    var self = {
      'serviceProvidersObj': [],
      'getServiceProviders': function(){
        $http.get('/sProvider').then(function(response) {
          self.serviceProvidersObj = response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      },
      'getServiceProviderByID': function(id){
        return $http.get('/sProvider/:id');
      },
      'getServiceProvidersServicesByID': function(id){
        return $http.get('/sProvider/:id/services');
      },
      'addServiceProvider': function(ServiceProvider){
        return $http.post('/sProvider/add',ServiceProvider);
      }
    };
    self.getServiceProviders();
    return self;
  }]);
  app.service('ServicesServ',['$http',function($http){
    var self = {
      'servicesObj': [],
      'getServices': function(){
        $http.get('/service').then(function(response) {
          self.servicesObj = response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      },
      'getServiceByID': function(id){
        return $http.get('/service/:id');
      },
      'addService': function(Service){
        return $http.post('/service/add',Service);
      }
    };
    self.getServices();
    return self;
  }]);
  app.service('SuppliersServ',['$http',function($http){
    var self = {
      'suppliersObj': [],
      'getSuppliers': function(){
        $http.get('/supplier').then(function(response) {
          self.suppliersObj = response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      },
      'getSupplierByID': function(id){
        return $http.get('/supplier/:id');
      },
      'addSupplier': function(Supplier){
        return $http.post('/supplier/add',Supplier);
      }
    };
    self.getSuppliers();
    return self;
  }]);
  app.service('WarehousesServ',['$http',function($http){
    var self = {
      'warehousesObj': [],
      'getWarehouses': function(){
        $http.get('/warehouse').then(function(response) {
          self.warehousesObj = response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      },
      'getWarehouseByID': function(id){
        return $http.get('/warehouse/:id');
      },
      'addWarehouse': function(warehouse){
        return $http.post('/warehouse/add',warehouse);
      }
    };
    self.getWarehouses();
    return self;
  }]);
  app.service('CustomersServ',['$http',function($http){
    var self = {
      'customersObj': [],
      'getCustomers': function(){
        $http.get('/customer').then(function(response) {
          self.customersObj = response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      },
      'getCustomerByID': function(id){
        return $http.get('/customer/:id');
      },
      'addCustomer': function(customer){
        return $http.post('/customer/add',customer);
      }
    };
    self.getCustomers();
    return self;
  }]);
}());