(function(){
  'use strict';
  var app = angular.module('isp');
  app.factory('MenuFactory',function(){
    return {
      'active': -1
    }
  });
  app.service('ResllersService',['$http',function($http){
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
  app.service('ServicesService',['$http',function($http){
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
        return $http.post('/getServiceByID');
      }
    };
    self.getServices();
    return self;
  }]);
}());