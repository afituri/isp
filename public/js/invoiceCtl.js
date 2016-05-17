(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('PrintInvoiceCtl',['$scope','ReportServ',function($scope,ReportServ){
    $scope.invoice = ReportServ;
  }]);
}());