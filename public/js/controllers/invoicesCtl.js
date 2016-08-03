(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('InvoicesCtlPending',['$scope','toastr','CustomersServ','$modal','$stateParams','MenuFac','InvoicesServ',function($scope,toastr,CustomersServ,$modal,$stateParams,MenuFac,InvoicesServ){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    
    $scope.init = function(id){
    InvoicesServ.getInvoicePending(id,$scope.pageSize,$scope.currentPage).then(function(response) {
      console.log(response.data);
      $scope.allInvoice=response.data.result;
      $scope.total = response.data.count;
    }, function(response) {
        console.log("Something went wrong");
    }); 
  }
  $scope.init(2);
   
   $scope.getStatus = function(){
    $scope.init($scope.pending);
   }

   $scope.accept = function(id){
    $scope.id = id;
      $scope.deleteName = "هل حقا تريد تأكيد هذه الفاتورة";
      $scope.confirmModel = $modal({
        scope: $scope,
        templateUrl: 'pages/confirmModel.html',
        show: true
      });
   }
    $scope.editCustomerMessage ={};
   $scope.RejectInvoice = function(id){
    //alert(id.id);
    $scope.idreject = id;
    $scope.editCustomerMessage.reject_message = "خطأ بيانات الفاتورة غير صحيحة";
      $scope.deleteName = "هل حقا تريد تأكيد هذه الفاتورة";
      $scope.rejectDataModel = $modal({
        scope: $scope,
        templateUrl: 'pages/rejectModel.html',
        show: true
      });
   }

   $scope.rejectEdit = function(id){
     InvoicesServ.editInvoice(id.id,{status:3,reject_message:$scope.editCustomerMessage.reject_message}).then(function(response) {
    
      if(response.data){
          $scope.rejectDataModel.hide();
          $scope.init(3);
          //$state.go('customers');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
    }, function(response) {
        console.log("Something went wrong");
    });
   }

   $scope.confirmData = function(id){
    InvoicesServ.editInvoice(id.id,{status:-9}).then(function(response) {
        if(response.data){
          $scope.confirmModel.hide();
          $scope.init(2);
          //$state.go('customers');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
   }
  
  

  }]);

  app.controller('InvoicesCtl',['$scope','toastr','CustomersServ','$modal','$stateParams','MenuFac','InvoicesServ',function($scope,toastr,CustomersServ,$modal,$stateParams,MenuFac,InvoicesServ){
      InvoicesServ.getTotal($stateParams.id).then(function(response) {
      console.log("response");
      console.log(response.data);
      $scope.allTotals=response.data.sum.toFixed(2);
      $scope.piad =  response.data.piad.toFixed(2);

      $scope.Therest =(response.data.sum-response.data.piad).toFixed(2);
    }, function(response) {
        console.log("Something went wrong");
    });


    $scope.DeleteInvoice = function(id){
      $scope.id = id;
      $scope.deleteName = "هذه الفاتورة";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };

    $scope.moreInfo = function(obj){
      $scope.obj = obj;
      $scope.moreInfoModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.more.info.tpl.html',
        show: true
      });
    };

    $scope.confirmDelete = function(id){
      InvoicesServ.deleteInvoice(id.id).then(function(response) {
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.success('تم الحذف بنجاح');
          $scope.initInvoce();
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          toastr.success('تم الحذف بنجاح');
          $scope.initInvoce();
        } else if (response.data.result == 3){
          $scope.deleteModel.hide();
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      }, function(response) {
        $scope.deleteModel.hide();
        console.log("Something went wrong");
      });
    };



     $scope.renewInvoice = function(id){
      //alert(id);
     }

     
    MenuFac.active = 10;
    $scope.activePanel = MenuFac;
    //alert($stateParams.id);
    $scope.initInvoce = function(){
    InvoicesServ.getInvoiceByID(1,$stateParams.id).then(function(response) {
      $scope.invoiceID = response.data[0]._id;
      $scope.allInvoice=response.data;
    }, function(response) {
        console.log("Something went wrong");
    });
  }
  $scope.initInvoce();

    $scope.showInvoice = function(id){
      window.location.href='/report/printInvoice/'+id;
    },
    $scope.showPaid = function(id){
      //alert(id);
      window.location.href='/report/printInvoicePaid/'+id;
    }
  }]);

  app.controller('NewInvoiceCtl',['$scope','InStockServ','ProductsServ','ServicesServ','DollarServ','$state','MenuFac','InvoicesServ','HelperServ','CustomersServ','toastr','$http','ReportServ',function($scope,InStockServ,ProductsServ,ServicesServ,DollarServ,$state,MenuFac,InvoicesServ,HelperServ,CustomersServ,toastr,$http,ReportServ){    


    $scope.showId = function(id){
     
    }

    $scope.serviceChange = function(){
      ProductsServ.getProductPackagesByService($scope.ServiceModel._id).then(function(response){
        $scope.productsObj=response.data;
      },function(response){
        console.log("Something went wrong");
      });
    }

    ServicesServ.getAllServices().then(function(response){ 
      $scope.ServiceAll = response.data;
    },function(response){
      console.log("Somthing went wrong")
    });



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
      CustomersServ.getAllCustomersStatus().then(function(response) {
        $scope.customers = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.getDef= function(){
      var a ;
      a = new Date($scope.newInvoiceForm.startDate);
      var b = $scope.newInvoiceForm.endDate;
      a.setDate(a.getDate() - 1);
      a.setMonth(a.getMonth()+1);
      for(var i=0;a<=b;){
        i++;
        a.setMonth(a.getMonth()+1);
      
          
      }
      a.setMonth(a.getMonth()-1);
      $scope.newInvoiceForm.day=(b-a)/ (1000 * 3600 * 24);
      $scope.newInvoiceForm.month=i;
    },
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
    $scope.flag=false;
    $scope.getProductInfo = function(id){

      if(id == 'خدمة'){
        $scope.flag=false;
        $scope.productsObj = $scope.objects.servicesObj;
      } else if(id == 'معدة'){
          $scope.flag=false;
        $scope.productsObj = $scope.objects.itemsObj;
      } else if (id == 'حزمة'){
        $scope.flag=true;
        $scope.productsObj = $scope.objects.packagesObj;
      } else if (id == 'معدات'){
          $scope.flag=false;
        console.log($scope.objects);
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
              $scope.selectedProducts.push({'price':($scope.productName.initialPrice),'type':$scope.productType,'name':$scope.productName.name,'id':$scope.productName._id});
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

  app.controller('UpgreadeCtl',['$scope','$state','$stateParams','InvoicesServ','CustomersServ','HelperServ','toastr',function($scope,$state,$stateParams,InvoicesServ,CustomersServ,HelperServ,toastr){
   
    $scope.upInviceForm = {};
    $scope.objects = HelperServ;
    $scope.objects.getAllPackages();
    InvoicesServ.getInvoicedata($stateParams.id).then(function(response) {
      $scope.days=response.data.days;
      $scope.daysN=response.data.daysN;
      $scope.price=response.data.price;
      $scope.tot=response.data.price*(response.data.days-response.data.daysN);
      $scope.upInviceForm.discount=$scope.tot;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.upInvice = function(){
      $scope.upInviceForm.idCu=$stateParams.id;
      InvoicesServ.upgreadInvice($scope.upInviceForm).then(function(response){
        if(response.data){
          toastr.success('تم التطوير بنجاح');
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
    $scope.paidInvoiceForm.monoyStatus = "1";
    $scope.paidInvoice = function(){
      $scope.paidInvoiceForm.idCu=$stateParams.id;
      InvoicesServ.paidInvoice($scope.paidInvoiceForm).then(function(response){
        if(response.data){
          /*toastr.success('تم الدفع بنجاح');
          $state.go('invoiceCustomer')*/
           toastr.success('تم الدفع بنجاح');
          $scope.paidInvoiceForm.paid=" ";
          $scope.paidInvoiceForm.notes=" ";
          $state.go('paidInvoice');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
}());