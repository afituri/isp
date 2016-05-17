(function(){
  'use strict';
  var app = angular.module('isp');
  //dddddddddddddddddddddd
  app.controller('InvoicesCtl',['$scope','MenuFac','InvoicesServ',function($scope,MenuFac,InvoicesServ){
    MenuFac.active = 10;
    $scope.activePanel = MenuFac;
  }]);
  app.controller('NewInvoiceCtl',['$scope','$state','MenuFac','InvoicesServ','HelperServ','CustomersServ','toastr','$http','ReportServ',function($scope,$state,MenuFac,InvoicesServ,HelperServ,CustomersServ,toastr,$http,ReportServ){   
    $scope.myFunc = function() {
      $scope.search=angular.element('#Text1').val();
      var name=angular.element('#Text1').val();
      console.log(name);
      if(!name){ name=null;};
      $http({ method: 'POST', url: '/customer/in/'+name}).
        success(function(data, status, headers, config) {
          $scope.customers=data;
        }).error(function(data, status, headers, config) {
          console.log('Oops and error', data);
        });
    };
    MenuFac.active = 10;
    $scope.activePanel = MenuFac;
    $scope.objects = HelperServ;
    $scope.objects.getAllItems();
    $scope.objects.getAllServices();
    $scope.objects.getAllPackages();
    $scope.newInvoiceForm = {};
    $scope.previousSubscription = '1';
    $scope.init = function () {
      CustomersServ.getAllCustomers().then(function(response) {
        $scope.customers = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.newInvoice = function(){
      if($scope.previousSubscription==1){
        InvoicesServ.addInvoice($scope.newInvoiceForm).then(function(response,err){
          if(!err){
            console.log(response.data);
            window.location.href='/report/printInvoice/'+response.data[1]._id;
            // InvoicesServ.report(response.data).then(function(response,err){
            //   if(!err){

            //   }
            // },function(response){
            //   console.log("Something went wrong");
            // });
          }
        },function(response){
          console.log("Something went wrong");
        });
      } else if($scope.previousSubscription==2){
          InvoicesServ.addInvoice($scope.newInvoiceForm).then(function(response){

          },function(response){
            console.log("Something went wrong");
          });
        }
    }
  }]);
  app.controller('EditInvoiceCtl',['$scope','MenuFac','InvoicesServ',function($scope,MenuFac,InvoicesServ){
    MenuFac.active = 10;
    $scope.activePanel = MenuFac;
    $scope.editInvoiceForm = {};
  }]);
}());