(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('HomeCtl',['$scope','MenuFac','CustomersServ','PermissionServ','SuppliersServ','ResllersServ','InvoicesServ',function($scope,MenuFac,CustomersServ,PermissionServ,SuppliersServ,ResllersServ,InvoicesServ){
    $scope.Pages ={};
    $scope.dollarPage = "sss";
    $scope.notif=['إضافة فاتورة','إضافة فاتورة مبدئية','تجديد','دفعة']
     PermissionServ.getSubpermission().then(function(response){
        
        $scope.permission =true;
        if(response.data[0] != undefined){
          //employee
          $scope.permission =false;
        //dollar
        $scope.dollarPage = response.data[0].all;
        //resselers
        $scope.resselersPage = response.data[1].all;
        //invoice
        $scope.invoicePage = response.data[2].all;
        //service
        $scope.servicePage = response.data[3].all;
        //suppliers
        $scope.suppliersPage = response.data[4].all;
        //serviceProviders
        $scope.serviceProvidersPage = response.data[5].all;
        //warehouses
        $scope.warehousesPage = response.data[6].all;
        //instock
        $scope.instockPage = response.data[7].all;
        //productServices
        $scope.productServicesPage = response.data[8].all;
        //productItems
        $scope.productItemsPage = response.data[9].all;
        //productPackages
        $scope.productPackagesPage = response.data[10].all;

        if(($scope.productPackagesPage||$scope.productItemsPage||$scope.productServicesPage)==false){
          $scope.allProductService =false;
        } else {
           $scope.allProductService =true;
        }
        $scope.customersPage = response.data[11].all;
        //productPolicies
        $scope.productPoliciesPage = response.data[12].all;
         //policies
         $scope.policiesPage = response.data[13].all;      
      } else {

        //admin

        $scope.dollarPage = true;
        //resselers
        $scope.resselersPage = true;
        //invoice
        $scope.invoicePage = true;
        //service
        $scope.servicePage = true;
        //suppliers
        $scope.suppliersPage = true;
        //serviceProviders
        $scope.serviceProvidersPage = true;
        //warehouses
        $scope.warehousesPage = true;
        //instock
        $scope.instockPage = true;
        //productServices
        $scope.productServicesPage = true;
        //productItems
        $scope.productItemsPage = true;
        //productPackages
        $scope.productPackagesPage = true;
        $scope.allProductService =true;
       
        $scope.customersPage = true;
        //productPolicies
        $scope.productPoliciesPage =true;
         //policies
         $scope.policiesPage = true;      

      }






    },function(response){
      console.log("Somthing went wrong");
    });



    MenuFac.active = -1;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
     CustomersServ.getCustomersCount().then(function(response) {
        $scope.customerNumber = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
     
     CustomersServ.getAllMoney().then(function(response) {
        $scope.totalMoney = (response.data.sum).toFixed(2);
        $scope.totalPaid = (response.data.piad).toFixed(0);
        $scope.reminder = ((response.data.sum).toFixed(0)-(response.data.piad).toFixed(2));

      }, function(response) {
        console.log("Something went wrong");
      });
      
      SuppliersServ.getSuppliersCount().then(function(response) {
        $scope.suppliersCount = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });

      // all money 
      ResllersServ.getResellersCount().then(function(response) {
        $scope.ResellerCount = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });


  }]);
}());