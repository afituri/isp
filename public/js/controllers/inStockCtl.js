(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('inStockCtl',['$scope','PermissionServ','$modal','$stateParams','ProductsServ','InStockServ','$state','MenuFac','HelperServ','toastr',function($scope,PermissionServ,$modal,$stateParams,ProductsServ,InStockServ,$state,MenuFac,HelperServ,toastr){
     

     PermissionServ.getSubpermission().then(function(response){
      $scope.permission =true;
      if(response.data[0] != undefined){
        console.log(response.data[7]);
        //employee
        $scope.permission =false;

        $scope.addInStock =  response.data[7].add;
        $scope.deleteInStock = response.data[7].delete; 
        $scope.editInStock = response.data[7].edit; 
      } else {
        //admin
        $scope.addInStock =  true;
        $scope.deleteInStock = true; 
        $scope.editInStock = true;
      }
    },function(response){
      console.log("Somthing went wrong");
    }); 



    MenuFac.active =5;
    $scope.activePanel = MenuFac;
    $scope.objects=HelperServ;
    $scope.newInStockForm={};
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.editInStockForm={};
     InStockServ.getInStockById($stateParams.id).then(function(response) {
       console.log(response.data);
       $scope.editInStockForm = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });
    ProductsServ.getProductAll().then(function(response) {
      if(response.data){
        $scope.Allproduct=response.data;
      } else {
        console.log(response.data);
      }
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editInStock = function(){
      InStockServ.editInStock($stateParams.id,$scope.editInStockForm).then(function(response) {
        if(response.data){
          $state.go('inStock');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }

    $scope.init = function () {
      InStockServ.getInStocks($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.getInStocks = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showPass=false;
    $scope.hidePass=true;
    $scope.showPassword = function(){
      if(!$scope.showPass){
        $scope.showPass=true;
        $scope.hidePass=false;
      } else {
        $scope.showPass=false;
        $scope.hidePass=true;
      }
    }
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا المخزون";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      InStockServ.deleteStocks(id).then(function(response) {
        if(response.data.result == 1){
          $scope.deleteModel.hide();
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $scope.deleteModel.hide();
          toastr.success('تم الحذف بنجاح');
          $scope.init();
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

app.controller('NewInStockCtl',['$scope','ProductsServ','InStockServ','$state','MenuFac','HelperServ','toastr','CSVServ',function($scope,ProductsServ,InStockServ,$state,MenuFac,HelperServ,toastr,CSVServ){
  MenuFac.active = 5;
  $scope.activePanel = MenuFac;
  $scope.objects=HelperServ;
  $scope.objects.getAllStock();
  $scope.newInStockForm={};
  $scope.csv = {
    result: null,
    encoding: 'UTF-8',
  };
  $scope.productType=function(){
    if($scope.newInStockForm.type==1){
      ProductsServ.getAllService().then(function(response) {
      if(response.data){
        $scope.Allproduct=response.data;
      } else {
        console.log(response.data);
      }
      }, function(response) {
        console.log("Something went wrong");
      });
    } else if($scope.newInStockForm.type==2){
        ProductsServ.getAllItem().then(function(response) {
          if(response.data){
            $scope.Allproduct=response.data;
          } else {
            console.log(response.data);
          }
        }, function(response) {
            console.log("Something went wrong");
        });
    } else if($scope.newInStockForm.type==3){
        ProductsServ.getAllPackage().then(function(response) {
        if(response.data){
          $scope.Allproduct=response.data;
        } else {
          console.log(response.data);
        }
        }, function(response) {
          console.log("Something went wrong");
        });
    } else if($scope.newInStockForm.type==4){
        ProductsServ.getAllEtc().then(function(response) {
        if(response.data){
          $scope.Allproduct=response.data;
        } else {
          console.log(response.data);
        }
        }, function(response) {
          console.log("Something went wrong");
        });
    }
  }
  $scope.csv = {
      result: null,
      encoding: 'UTF-8',
    };
  $scope.newInStock = function(){
    $scope.newInStockForm.csv=$scope.csv.result;
    InStockServ.addInStock($scope.newInStockForm).then(function(response) {
      if(response.data){
        $state.go('inStock');
        toastr.success('تمت إضافة المخزون بنجاح');
      } else {
        console.log(response.data);
      }
    }, function(response) {
      console.log("Something went wrong");
    });
  };
  }]);
app.controller('TransferCtl',['$scope','ProductsServ','InStockServ','$state','MenuFac','HelperServ','toastr','CSVServ',function($scope,ProductsServ,InStockServ,$state,MenuFac,HelperServ,toastr,CSVServ){
  MenuFac.active =5;
    $scope.activePanel = MenuFac;
    $scope.objects=HelperServ;
    $scope.waerck=[];
    $scope.newInStockForm={};
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.editInStockForm={};
    $scope.objects.getAllWarehouses();
    ProductsServ.getProductAll().then(function(response) {
      if(response.data){
        $scope.Allproduct=response.data;
      } else {
        console.log(response.data);
      }
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.init = function (id) {
      InStockServ.getByWare(id,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.getInStocks = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init(-1);
    $scope.getIn= function(){
      if($scope.warehouse){
        $scope.init($scope.warehouse);
      }else{
        $scope.init(-1);
      }
      
    }
    $scope.showPass=false;
    $scope.hidePass=true;
    $scope.showPassword = function(){
      if(!$scope.showPass){
        $scope.showPass=true;
        $scope.hidePass=false;
      } else {
        $scope.showPass=false;
        $scope.hidePass=true;
      }
    }
    $scope.transfer = function(){
      if($scope.warehouseTo){
        InStockServ.transfer($scope.waerck,$scope.warehouseTo).then(function(response) {
          $scope.waerck=[];
          if($scope.warehouse){
            $scope.init($scope.warehouse);
          }else{
            $scope.init(-1);
          }
        }, function(response) {
          console.log("Something went wrong");
        });
      }
    }
    $scope.check = function(id){
      var idx = $scope.waerck.indexOf(id);
      if (idx > -1) {
        $scope.waerck.splice(idx, 1);
      }else {
        $scope.waerck.push(id);
      }
    }
  }]);
}());