(function(){
  'use strict';
  var app = angular.module('reseller');
  app.service('HelperServ',['$http',function($http){
    var self = {
      'stockObj': [],
      'citiesObj': [],
      'suppliersObj': [],
      'serviceProvidersObj': [],
      'itemsObj': [],
      'servicesObj': [],
      'packagesObj': [],
      'policiesObj': [],
      'etcObj': [],
      'resellersObj': [],
      'getAllStock': function(){
        $http.get('/warehouse/all').then(function(response) {
          self.stockObj = response.data.result;
        }, function(response) {
          console.log("Something went wrong in getAllCities");
        });
      },
      'getAllCities': function(){
        $http.get('/cities').then(function(response) {
          self.citiesObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllCities");
        });
      },
      'getAllSuppliers': function(){
        return $http.get('/supplier/all').then(function(response) {
          self.suppliersObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllSuppliers");
        });
      },
      'getServiceProvidersServicesByID': function(id){
        return $http.get('/sProvider/'+id+'/services');
      },
      'getAllServiceProviders': function(){
        return $http.get('/sProvider/').then(function(response) {
          self.serviceProvidersObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllServiceProviders");
        });
      },
      'getAllItems': function(){
        return $http.get('/product/allItem').then(function(response) {
          self.itemsObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllItems");
        });
      },
      'getAllServices': function(){
        return $http.get('/product/allService').then(function(response) {
          self.servicesObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllServices");
        });
      },
      'getAllPackages': function(){
        return $http.get('/product/allPackage').then(function(response) {
          self.packagesObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllPackages");
        });
      },
      'getAllEtcs': function(){
        return $http.get('/product/allEtc').then(function(response) {
          self.etcObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllPackages");
        });
      },
      'getAllPolicies': function(){
        return $http.get('/policy/all').then(function(response) {
          self.policiesObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllPolicies");
        });
      },
      'getAllResellers': function(){
        return $http.get('/reseller/all').then(function(response) {
          self.resellersObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllResellers");
        });
      }
    };
    self.getAllStock();
    self.getAllCities();
    self.getAllSuppliers();
    self.getAllServiceProviders();
    return self;
  }]);
  app.service('CustomersServ',['$http',function($http){
    var self = {
      'getCustomers': function(status,pageSize,currentPage){
        return $http.get('/customer/'+pageSize+'/'+currentPage+'/'+status);
      },
      'getAllCustomers': function(){
        return $http.get('/customer/all');
      },
      'getCustomerByID': function(id){
        return $http.get('/customer/'+id);
      },
      'addCustomer': function(customerObj){
        console.log(customerObj);
        return $http.post('/customer/add',customerObj);
      },
      'editCustomer': function(id,customerObj){
        return $http.put('/customer/edit/'+id,customerObj);
      },
      'deleteCustomer': function(id){
        return $http.delete('/customer/delete/'+id);
      }
    };
    return self;
  }]);
}());