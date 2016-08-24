(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('HomeCtl',['$scope','MenuFac','CustomersServ','PermissionServ','SuppliersServ','ResllersServ','InvoicesServ',function($scope,MenuFac,CustomersServ,PermissionServ,SuppliersServ,ResllersServ,InvoicesServ){
    $scope.Pages ={};
    $scope.dollarPage = "sss";
    
     PermissionServ.getSubpermission().then(function(response){
        
        $scope.permission =true;
        if(response.data[0] != undefined){
          //employee
          $scope.permission =false;
        //dollar
        $scope.dollarPage = response.data[0].all;

        //resselers
        $scope.resselersPage = response.data[1].all;
        $scope.resselersAddPage = response.data[1].add;
        //invoice
        $scope.invoicePage = response.data[2].all;
        $scope.invoiceAddPage = response.data[2].add;
        //service
        $scope.servicePage = response.data[3].all;
        $scope.serviceAddPage = response.data[3].add;
        //suppliers
        $scope.suppliersPage = response.data[4].all;
        $scope.suppliersAddPage = response.data[4].add;
        //serviceProviders
        $scope.serviceProvidersPage = response.data[5].all;
        $scope.serviceProvidersAddPage = response.data[5].add;
        //warehouses
        $scope.warehousesPage = response.data[6].all;
        $scope.warehousesAddPage = response.data[6].add;
        //instock
        $scope.instockPage = response.data[7].all;
        $scope.instockAddPage = response.data[7].add;
        //productServices
        $scope.productServicesPage = response.data[8].all;
        $scope.productServicesAddPage = response.data[8].add;
        //productItems
        $scope.productItemsPage = response.data[9].all;
        $scope.productItemAddPage = response.data[9].add;

        //productPackages
        $scope.productPackagesPage = response.data[10].all;
        $scope.productPackAddPage = response.data[10].add;

        if(($scope.productPackagesPage||$scope.productItemsPage||$scope.productServicesPage)==false){
          $scope.allProductService =false;
        } else {
           $scope.allProductService =true;
        }
        $scope.customersPage = response.data[11].all;
        $scope.customersAddPage = response.data[11].add;
        //productPolicies
        $scope.productPoliciesPage = response.data[12].all;
        $scope.productPoliciesAddPage = response.data[12].add;
         //policies
         $scope.policiesPage = response.data[13].all;     
         $scope.policiesAddPage = response.data[13].add;       
      } else {

        //admin
        $scope.invoiceAddPage = true;
        $scope.productPoliciesAddPage = true;
        $scope.resselersAddPage = true;
        $scope.serviceAddPage = true;
        $scope.suppliersAddPage = true;
        $scope.serviceProvidersAddPage = true;
        $scope.warehousesAddPage = true;
        $scope.instockAddPage = true;
        $scope.productPackAddPage = true;
        $scope.productServicesAddPage = true;
        $scope.productItemAddPage = true;
        $scope.customersAddPage = true;
        $scope.policiesAddPage=true;
        $scope.dollarPage = true;
        //resselers
        $scope.resselersPage = true;
        //invoice
        $scope.invoicePage = true;
        //service
        $scope.servicePage = true;
        $scope.serviceAddPage = true;
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