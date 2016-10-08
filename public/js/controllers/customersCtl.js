(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('CustomersCtl',['$scope','PermissionServ','$modal','MenuFac','CustomersServ','toastr','HelperServ',function($scope,PermissionServ,$modal,MenuFac,CustomersServ,toastr,HelperServ){
    
     PermissionServ.getSubpermission().then(function(response){
      $scope.permission =true;
      if(response.data[0] != undefined){
        console.log(response.data[11]);
        //employee
        $scope.permission =false;
        $scope.addCustomer =  response.data[11].add;
        $scope.deleteCustomer = response.data[11].delete; 
        $scope.editCustomer = response.data[11].edit; 
      } else {
        //admin
        $scope.addCustomer =  true;
        $scope.deleteCustomer = true; 
        $scope.editCustomer = true;
      }
    },function(response){
      console.log("Somthing went wrong");
    }); 

    
    
    $scope.searchCustomer = function(){
      $scope.package = '-1';
      $scope.results = [];
      if($scope.searchByName == ""){
        $scope.init($scope.package,$scope.result);
      } else {
      CustomersServ.getCustomerByAll($scope.searchByName,$scope.pageSize,$scope.currentPage).then(function(response){
        $scope.customerss = response.data.result;
        $scope.total = response.data.count;
      },function(response){
        console.log("Something went wrong");
      });
    }
      // function to server 
    }

    MenuFac.active = 6;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    HelperServ.getAllResellers();
    HelperServ.getAllPackages();
    $scope.objects = HelperServ;
    // console.log($scope.objects.resellersObj);
    $scope.results = [];
    $scope.package = '-1';
    $scope.reseller = '-1';
    $scope.init = function (idR,idP,name) {
      if(name== undefined|| name.length==0){
        name=-1;
      }
      CustomersServ.getCustomersRe(idR,idP,name,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.customers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init($scope.package,$scope.reseller,'');

    //.getCustomers(1,

    //    $scope.initi = function () {
    //   CustomersServ.getCustomers(1,$scope.pageSize,$scope.currentPage).then(function(response) {
    //     $scope.customerss = response.data.result;
    //     console.log($scope.customers);
    //     $scope.total = response.data.count;
    //   }, function(response) {
    //     console.log("Something went wrong");
    //   });
    // }
    // $scope.initi();



    $scope.getRe = function(){
      $scope.init($scope.reseller,$scope.package,$scope.searchByName);
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
          $scope.initi();
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
  app.controller('NewCustomerCtl',['$scope','$timeout','$state','MenuFac','CustomersServ','HelperServ','toastr',function($scope,$timeout,$state,MenuFac,CustomersServ,HelperServ,toastr){
    MenuFac.active = 6;
    $scope.activePanel = MenuFac;
    $scope.newCustomerForm = {};
    $scope.objects = HelperServ;
    $scope.newCustomer = function(){
      $scope.loadingStatus = true;
      $scope.newCustomerForm.status=1;
      CustomersServ.addCustomer($scope.newCustomerForm).then(function(response) {
        if(response.data){
          $timeout(function () {
            $scope.newCustomerForm = {};
            $state.go('customers');
            toastr.success('تمت إضافة زبون جديد بنجاح');
            $scope.loadingStatus = false;
          },3000);
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