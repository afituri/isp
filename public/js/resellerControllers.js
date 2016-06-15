(function(){
  'use strict';
  var app = angular.module('reseller');

    app.controller('DashboardCtl',['$scope',function($scope){

    }]);
 
    app.controller('invoicesStatus',['$scope','toastr','CustomersServ','$modal','$stateParams','MenuFac','InvoicesServ',function($scope,toastr,CustomersServ,$modal,$stateParams,MenuFac,InvoicesServ){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    
    $scope.init = function(id){
    InvoicesServ.getInvoicePendingRes(id,$scope.pageSize,$scope.currentPage).then(function(response) {
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

   $scope.confirmData = function(id){
    InvoicesServ.editInvoice(id.id,{status:1}).then(function(response) {
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


  app.controller('CustomersPendingCtl',['$scope','$modal','CustomersServ','toastr',function($scope,$modal,CustomersServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    
     $scope.init = function () {
      CustomersServ.getCustomersReject(2,$scope.pageSize,$scope.currentPage).then(function(response) {
        console.log(response.data.result);
        $scope.customers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا الزبون";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      CustomersServ.deleteCustomer(id).then(function(response) {
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          $scope.init();
          toastr.success('تم الحذف بنجاح');
        } else if (response.data.result == 3){
          $scope.deleteModel.hide();
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      }, function(response) {
        $scope.deleteModel.hide();
        console.log("Something went wrong");
      });
    };
  }]);

 app.controller('CustomersRejectCtl',['$scope','$modal','CustomersServ','toastr',function($scope,$modal,CustomersServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    
    $scope.init = function () {
      CustomersServ.getCustomersReject(3,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.customers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا الزبون";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      CustomersServ.deleteCustomer(id).then(function(response) {
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          $scope.init();
          toastr.success('تم الحذف بنجاح');
        } else if (response.data.result == 3){
          $scope.deleteModel.hide();
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      }, function(response) {
        $scope.deleteModel.hide();
        console.log("Something went wrong");
      });
    };
  }]);

  app.controller('NewCustomerPendingCtl',['$scope','$state','CustomersServ','HelperServ','toastr',function($scope,$state,CustomersServ,HelperServ,toastr){
    $scope.newCustomerForm = {};
    $scope.objects = HelperServ;
    $scope.newCustomer = function(){
      $scope.newCustomerForm.status = 2;
      CustomersServ.addCustomer($scope.newCustomerForm).then(function(response) {
        if(response.data){
          $state.go('customersPending');
          toastr.success('تمت إضافة زبون جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  

  app.controller('NewCustomerCtl',['$scope','$state','CustomersServ','HelperServ','toastr',function($scope,$state,CustomersServ,HelperServ,toastr){
    $scope.newCustomerForm = {};
    $scope.objects = HelperServ;
    $scope.newCustomer = function(){
      CustomersServ.addCustomer($scope.newCustomerForm).then(function(response) {
        if(response.data){
          $state.go('customers');
          toastr.success('تمت إضافة زبون جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditCustomerCtl',['$scope','$state','$stateParams','CustomersServ','HelperServ','toastr',function($scope,$state,$stateParams,CustomersServ,HelperServ,toastr){
    $scope.editCustomerForm = {};
    $scope.objects = HelperServ;
    CustomersServ.getCustomerByID($stateParams.id).then(function(response) {
      $scope.editCustomerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editCustomer = function(){
      CustomersServ.editCustomer($stateParams.id,$scope.editCustomerForm).then(function(response) {
        if(response.data){
          $state.go('customersPending');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
     
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);
 /* app.controller('InvoicesCtl',['$scope','$state','CustomersServ','HelperServ','toastr',function($scope,$state,CustomersServ,HelperServ,toastr){
  }]);
  app.controller('NewInvoiceCtl',['$scope','$state','CustomersServ','HelperServ','toastr',function($scope,$state,CustomersServ,HelperServ,toastr){
  }]);*/
app.controller('InvoicesCtl',['$scope','$stateParams','MenuFac','InvoicesServ',function($scope,$stateParams,MenuFac,InvoicesServ){
    $scope.resellerFlag=1;
    InvoicesServ.getTotal($stateParams.id).then(function(response) {
      console.log("response");
      console.log(response.data);
      $scope.allTotals=response.data.sum.toFixed(2);
      $scope.piad =  response.data.piad.toFixed(2);

      $scope.Therest =(response.data.sum-response.data.piad).toFixed(2);
    }, function(response) {
        console.log("Something went wrong");
    });



     
     $scope.renewInvoice = function(id){
      //alert(id);
     }

    MenuFac.active = 10;
    $scope.activePanel = MenuFac;
    //alert($stateParams.id);
    InvoicesServ.getInvoiceByID(2,$stateParams.id).then(function(response) {
      console.log(response.data);
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
      CustomersServ.getResCustomers().then(function(response) {
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
      InvoicesServ.renewInvicePending($scope.renewInviceForm).then(function(response){
        if(response.data){
          toastr.success('تم التجديد بنجاح');

          $state.go('invoices');
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
          $scope.paidInvoiceForm.paid=" "
          $state.go('paidInvoice');

        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);

   app.controller('CustomersCtl',['$scope','$modal','MenuFac','CustomersServ','toastr',function($scope,$modal,MenuFac,CustomersServ,toastr){
    MenuFac.active = 6;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    
//000000000
    $scope.init = function () {
      CustomersServ.getCustomersForResseler($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.customers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();




    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا الزبون";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      CustomersServ.deleteCustomer(id).then(function(response) {
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          $scope.init();
          toastr.success('تم الحذف بنجاح');
        } else if (response.data.result == 3){
          $scope.deleteModel.hide();
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      }, function(response) {
        $scope.deleteModel.hide();
        console.log("Something went wrong");
      });
    };
  }]);






app.controller('CustomerPendingCtl',['$scope','$modal','MenuFac','CustomersServ','toastr',function($scope,$modal,MenuFac,CustomersServ,toastr){
    MenuFac.active = 6;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function () {
      CustomersServ.getCustomers(2,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.customers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.editCustomerMessage={};
    $scope.editCustomerMessage.reject_message ="خطأ : البيانات غير صحيحة "; 

    $scope.rejectData = function(id){
      $scope.idreject = id;
      $scope.deleteName = "هذا الزبون";
      $scope.rejectDataModel = $modal({
        scope: $scope,
        templateUrl: 'pages/rejectModel.html',
        show: true
      });
    };

    $scope.rejectEdit = function(id){
 /*     alert(id);
      alert($scope.editCustomerMessage.reject_message);
*/
      CustomersServ.editCustomerReject(id,$scope.editCustomerMessage).then(function(response) {
        if(response.data){
          $scope.rejectDataModel.hide();
          $scope.init();
          //$state.go('customers');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });

    }

    $scope.confirmCustomer = function(id){
      //alert(id.id);
      $scope.id = id.id;
      $scope.deleteName = "هل حقا تريد تأكيد هذه البيانات ؟";
      $scope.confirmModel = $modal({
        scope: $scope,
        templateUrl: 'pages/confirmModel.html',
        show: true
      });
    }

    $scope.confirmData = function(id){
      CustomersServ.editCustomerById(id).then(function(response) {
        if(response.data==1){
          //$state.go('customers');
          $scope.init();
          $scope.confirmModel.hide();
          toastr.info('تم التأكيد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });


    }



    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا الزبون";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      CustomersServ.deleteCustomer(id).then(function(response) {
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          $scope.init();
          toastr.success('تم الحذف بنجاح');
        } else if (response.data.result == 3){
          $scope.deleteModel.hide();
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      }, function(response) {
        $scope.deleteModel.hide();
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('NewCustomerCtl',['$scope','$state','MenuFac','CustomersServ','HelperServ','toastr',function($scope,$state,MenuFac,CustomersServ,HelperServ,toastr){
    MenuFac.active = 6;
    $scope.activePanel = MenuFac;
    $scope.newCustomerForm = {};
    $scope.objects = HelperServ;
    $scope.newCustomer = function(){
      $scope.newCustomerForm.status=1;
      CustomersServ.addCustomer($scope.newCustomerForm).then(function(response) {
        if(response.data){
          $state.go('customers');
          toastr.success('تمت إضافة زبون جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditCustomerCtl',['$scope','$state','$stateParams','MenuFac','CustomersServ','HelperServ','toastr',function($scope,$state,$stateParams,MenuFac,CustomersServ,HelperServ,toastr){
    MenuFac.active = 6;
    $scope.activePanel = MenuFac;
    $scope.editCustomerForm = {};
    $scope.objects = HelperServ;
    CustomersServ.getCustomerByID($stateParams.id).then(function(response) {
      $scope.editCustomerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editCustomer = function(){
      CustomersServ.editCustomer($stateParams.id,$scope.editCustomerForm).then(function(response) {
        if(response.data){
          $state.go('customers');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);







}());