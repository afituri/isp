(function(){
  'use strict';
  var app = angular.module('isp');
  //dddddddddddddddddddddd
  app.controller('InvoicesCtl',['$scope','$stateParams','MenuFac','InvoicesServ',function($scope,$stateParams,MenuFac,InvoicesServ){
    MenuFac.active = 10;
    $scope.activePanel = MenuFac;
    //alert($stateParams.id);
    InvoicesServ.getInvoiceByID($stateParams.id).then(function(response) {
      $scope.allInvoice=response.data;
    }, function(response) {
        console.log("Something went wrong");
    });

    $scope.showInvoice = function(id){
      window.location.href='/report/printInvoice/'+id;
    }
  }]);

  app.controller('NewInvoiceCtl',['$scope','InStockServ','DollarServ','$state','MenuFac','InvoicesServ','HelperServ','CustomersServ','toastr','$http','ReportServ',function($scope,InStockServ,DollarServ,$state,MenuFac,InvoicesServ,HelperServ,CustomersServ,toastr,$http,ReportServ){    
    

    $scope.showId = function(id){
     
    }

    $scope.stock={};
    $scope.stockId=0;
    $scope.getStockId=function(id){
      $scope.stockId=$scope.stock._id;
      InStockServ.getByWP($scope.stock._id,$scope.ItemId).then(function(response) {
        
        $scope.getData = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });

    };
    $scope.go =function(id,name){
      $scope.customId=id;
    }
    $scope.myFunc = function() {
      $scope.search=angular.element('#Text1').val();
      var name=angular.element('#Text1').val();
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
    $scope.objects.getAllEtcs();
    $scope.objects.getAllServices();
    $scope.objects.getAllPackages();
    $scope.objects.getAllResellers();
    $scope.objects.getAllStock();
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
        $scope.newInvoiceForm.previousSubscription=1;
        // $scope.newInvoiceForm.itemInfo=$scope.itemInfo.inst;
        $scope.newInvoiceForm.selectedProducts=$scope.selectedProducts;
        $scope.newInvoiceForm.inStockdata=$scope.inStockdata;
        InvoicesServ.addInvoice($scope.newInvoiceForm).then(function(response,err){
          if(!err){
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
          $scope.newInvoiceForm.previousSubscription=2;
          if($scope.customId != undefined){
          $scope.newInvoiceForm.customId=$scope.customId;
          // $scope.newInvoiceForm.itemInfo=$scope.itemInfo.inst;
          $scope.newInvoiceForm.selectedProducts=$scope.selectedProducts;
          $scope.newInvoiceForm.inStockdata=$scope.inStockdata;
          InvoicesServ.addInvoice($scope.newInvoiceForm).then(function(response){
            window.location.href='/report/printInvoice/'+response.data[1]._id;
          },function(response){
            console.log("Something went wrong");
          });
        } else {
          toastr.error("الرجاء اختيار الاسم بطريقة صحيحة");
        }
        }
    };
    $scope.getItemInfo = function(){
      InvoicesServ.getItemInfoByID($scope.newInvoiceForm.productItem).then(function(response){
        $scope.itemInfo={};
        $scope.itemInfo.username = response.data.username;
        $scope.itemInfo.password = response.data.password;
        $scope.itemInfo.inst=response.data._id;
      },function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.getProductInfo = function(id){
      if(id == 'خدمة'){
        $scope.productsObj = $scope.objects.servicesObj;
      } else if(id == 'معدة'){
        $scope.productsObj = $scope.objects.itemsObj;
      } else if (id == 'حزمة'){
        $scope.productsObj = $scope.objects.packagesObj;
      } else if (id == 'معدات'){
        $scope.productsObj = $scope.objects.etcObj;

      }
    };

    $scope.selectedProducts = [];
    $scope.productTypeRequired = false;
    $scope.productNameRequired = false;
    $scope.newInvoiceForm.total = 0;
    $scope.countItem=0;
    $scope.selectProduct = function(){
      if(!$scope.productType){
        $scope.productTypeRequired = true;
      }
      if(!$scope.productName){
        $scope.productNameRequired = true;
      }
      if($scope.productType && $scope.productName){

        DollarServ.getLastDollar().then(function(response) {
          //console.log(response.data[0].price);
          
          if($scope.productType=="معدة"){
            if($scope.countItem==0){
              $scope.countItem=1;
              $scope.ItemId=$scope.productName._id;
               InStockServ.getByWP($scope.stock._id,$scope.ItemId).then(function(response) {
                $scope.getData = response.data;
              }, function(response) {
                console.log("Something went wrong");
              });
              $scope.dollarToday=response.data[0].price;
              $scope.selectedProducts.push({'price':($scope.productName.initialPrice * $scope.dollarToday),'type':$scope.productType,'name':$scope.productName.name,'id':$scope.productName._id});
              $scope.newInvoiceForm.total = $scope.newInvoiceForm.total + ($scope.productName.initialPrice * $scope.dollarToday);
              $scope.productType = '';
              $scope.productName = '';
             } else {
            //000000
            toastr["error"]("عفوا لا يمكن اختيار اكثر من معدة");
          } 
          } else {
            $scope.dollarToday=response.data[0].price;
            $scope.selectedProducts.push({'price':($scope.productName.initialPrice * $scope.dollarToday),'type':$scope.productType,'name':$scope.productName.name,'id':$scope.productName._id});
            $scope.newInvoiceForm.total = $scope.newInvoiceForm.total + ($scope.productName.initialPrice * $scope.dollarToday);
            $scope.productType = '';
            $scope.productName = '';
          }
         
         

        }, function(response) {
          console.log("Something went wrong");
        });
      }
    };
    $scope.removeSelect = function(index){
      if($scope.selectedProducts[index].type == "معدة"){
        $scope.countItem=0;
      }
      $scope.selectedProducts.splice(index, 1);
    };
  }]);
  app.controller('EditInvoiceCtl',['$scope','MenuFac','InvoicesServ',function($scope,MenuFac,InvoicesServ){
    MenuFac.active = 10;
    $scope.activePanel = MenuFac;
    $scope.editInvoiceForm = {};
  }]);
  app.controller('RenewInvoiceCtl',['$scope','$state','$stateParams','InvoicesServ','CustomersServ','HelperServ','toastr',function($scope,$state,$stateParams,InvoicesServ,CustomersServ,HelperServ,toastr){
    $scope.renewInviceForm = {};
    $scope.objects = HelperServ;
    $scope.objects.getAllPackages();
    CustomersServ.getCustomerByID($stateParams.id).then(function(response) {
      $scope.customer = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.renewInvice = function(){
      $scope.renewInviceForm.idCu=$stateParams.id;
      InvoicesServ.renewInvice($scope.renewInviceForm).then(function(response){
        if(response.data){
          toastr.success('تم التجديد بنجاح');
          $state.go('invoiceCustomer')
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('PaidInvoiceCtl',['$scope','$state','$stateParams','InvoicesServ','CustomersServ','HelperServ','toastr',function($scope,$state,$stateParams,InvoicesServ,CustomersServ,HelperServ,toastr){
    $scope.paidInvoiceForm = {};
    CustomersServ.getCustomerByID($stateParams.id).then(function(response) {
      $scope.customer = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.paidInvoice = function(){
      $scope.paidInvoiceForm.idCu=$stateParams.id;
      InvoicesServ.paidInvoice($scope.paidInvoiceForm).then(function(response){
        if(response.data){
          toastr.success('تم الدفع بنجاح');
          $state.go('invoiceCustomer')
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
}());