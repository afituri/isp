(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('ReportsCtl',['$scope','ServicesServ','InStockServ','toastr','$modal','InvoicesServ','HelperServ',function($scope,ServicesServ,InStockServ,toastr,$modal,InvoicesServ,HelperServ){
   




    $scope.searchByMacAdress = function() {
      if($scope.searchByMac==""){
        $scope.customers = null;
      } else {
      InStockServ.getInfoByMackAdress($scope.searchByMac).then(function(response){
        console.log(response.data);
        $scope.customers = response.data;
      },function(response){
        console.log("Somthing went wrong");
      });
    }
    }



    ServicesServ.getAllServices().then(function(response){ 
      $scope.ServiceAll = response.data;
    },function(response){
      console.log("Somthing went wrong")
    });


   $scope.showMacAdress = function(id){
    InvoicesServ.searchForProduct(id.id).then(function(response) {
    
    if(response.data==false){
      toastr.error('هذا الزبون لم يشتري اي منتج بعد ');
    } else {
    $scope.resul= response.data.result;
/*      $scope.total = response.data.count;*/
   $scope.deleteName = "هذا الموزع";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/showData.html',
        show: true
      });
    }
    }, function(response) {
      
      console.log("Something went wrong");
    });


    
   }


    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;

    $scope.init= function(){

       InvoicesServ.searchForMac(-9,$scope.pageSize,$scope.currentPage).then(function(response) {
          $scope.resultsAll= response.data.result;
          $scope.counter = response.data.count;
          $scope.total = response.data.count;
        }, function(response) {
          console.log("Something went wrong");
        });
     
   }
   $scope.init();
    $scope.message = "البحث/ الإسم / البريد الإلكتروني / الهاتف ";
    $scope.funcionSwich = 1;
    $scope.switch = function(){
      $scope.message={};
      /*alert($scope.idSwitch);*/
      if($scope.idSwitch){
        $scope.funcionSwich =0;
        $scope.message = "سيريال نمبر";
      } else {
        $scope.funcionSwich =1;
        $scope.message = "البحث/ الإسم / البريد الإلكتروني / الهاتف ";
      }
    }

    // get service data 
    ServicesServ.getAllServices().then(function(response){
      $scope.allService = response.data;
    },function(response){
      console.log("Somthing went wrong");
    })
    $


    $scope.ServiceFunc = function(id){
      
      ServicesServ.getCustomerByService(id).then(function(response){
        console.log(response.data);
        var customers=[];
        for(var i in response.data){
          console.log(response.data[i].customer);
          customers.push(response.data[i].customer);
        }
        console.log(customers);
        $scope.counter = customers.length;
        $scope.resultsAll = customers;
     },function(response){
      console.log("Something went wrong");
     });

      
    }


     $scope.searchMacAdress = function(){

      

      if($scope.funcionSwich==1){
        if($scope.searchByAll ==""){
           $scope.init();
        } else {
          /*alert("search for all number  without service");*/
         InvoicesServ.searchForMac($scope.searchByAll,$scope.pageSize,$scope.currentPage).then(function(response) {
            console.log("response");
            $scope.resultsAll= response.data.result;
            $scope.counter = response.data.result.length; 
            console.log($scope.resultsAll);
            $scope.total = response.data.count;
          }, function(response) {
            console.log("Something went wrong");
          });
       }
      } else if($scope.funcionSwich==0){
        if($scope.searchByAll ==""){
           $scope.init();
        } else {
          // search for serial number 
          /*alert("search for serial number  without service");*/
           if($scope.searchByMac==""){
        $scope.customers = null;
      } else {
      InStockServ.getInfoByMackAdress($scope.searchByAll).then(function(response){
        console.log(response.data.invoice.customer);
        $scope.resultsAll = [response.data.invoice.customer];
        $scope.counter = [response.data.invoice.customer].length; 
      },function(response){
        console.log("Somthing went wrong");
      });
    }


        }
      }
    
   
  }



    HelperServ.getAllResellers();
    $scope.objects = HelperServ;
    $scope.results = [];

    $scope.showStatus = function(){
      if($scope.Active==1){
        // alert($scope.Active);
        InvoicesServ.active($scope.ServiceModel).then(function(response) {
          $scope.results= response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      } else {
          InvoicesServ.unActive($scope.ServiceModel).then(function(response) {
          console.log("response");
          $scope.results= response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      }
    };

    $scope.printStatus = function(){
      //alert($scope.Active);
       if($scope.Active==1){
        window.location.href ="/report/printActive/"+$scope.ServiceModel._id;
      } else {
        window.location.href ="/report/printunActive/"+$scope.ServiceModel._id;
      }

    };

     $scope.showDate = function(){
        InvoicesServ.contractBetweenDates($scope.startDate,$scope.endDate,$scope.ServiceModel).then(function(response) {
          console.log("response");
          $scope.results= response.data;
        }, function(response) {
          console.log("Something went wrong");
        });

    };

    $scope.showReseller = function(){
       InvoicesServ.Byresseler($scope.reseller).then(function(response) {
          $scope.results= response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
    };


    
   
    $scope.printDate = function(){
      window.location.href="/report/printBetween/"+$scope.startDate+"/"+$scope.endDate+"/"+$scope.ServiceModel._id;
    };
   
    $scope.printReseller = function(){
      window.location.href="/report/printReseller/"+$scope.reseller;
    /*  InvoicesServ.printResseler($scope.reseller).then(function(response) {
        $scope.results= response.data;
      }, function(response) {
        console.log("Something went wrong");
      });*/
    };
  }]);
}());