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
        $http.get('/getResellers').then(function(response) {
          self.resellersObj = response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      },
      'getResellersByID': function(id){
        return $http.post('/getResellerByID');
      }
    };
    self.getResellers();
    return self;
  }]);
  app.service('ServiceProvidersServ',['$http',function($http){
    var self = {
      'serviceProvidersObj': [],
      'getServiceProviders': function(){
        $http.get('/getServiceProviders').then(function(response) {
          self.serviceProvidersObj = response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      },
      'getServiceProviderByID': function(id){
        return $http.post('/getServiceProviderByID');
      }
    };
    self.getServiceProviders();
    return self;
  }]);
  app.service('ServicesServ',['$http',function($http){
    var self = {
      'servicesObj': [],
      'getServices': function(){
        $http.get('/getServices').then(function(response) {
          self.servicesObj = response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      },
      'getServiceByID': function(id){
        return $http.put('/getServiceByID');
      }
    };
    self.getServices();
    return self;
  }]);
  app.service('SuppliersServ',['$http',function($http){
    var self = {
      'suppliersObj': [],
      'getSuppliers': function(){
        $http.get('/getSuppliers').then(function(response) {
          self.suppliersObj = response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      },
      'getSupplierByID': function(id){
        return $http.put('/getSupplierByID');
      }
    };
    self.getSuppliers();
    return self;
  }]);
}());