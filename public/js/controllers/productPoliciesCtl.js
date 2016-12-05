(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('ProductPoliciesCtl',['$scope','PermissionServ','MenuFac','ProductPoliciesServ',function($scope,PermissionServ,MenuFac,ProductPoliciesServ){
     PermissionServ.getSubpermission().then(function(response){
      $scope.permission =true;
      if(response.data[0] != undefined){
        console.log(response.data[12]);
        //employee
        $scope.permission =false;

        $scope.addProductPolicy =  response.data[12].add;
        $scope.deleteProductPolicy = response.data[12].delete; 
        $scope.editProductPolicy = response.data[12].edit; 
      } else {
        //admin
        $scope.addProductPolicy =  true;
        $scope.deleteProductPolicy = true; 
        $scope.editProductPolicy = true;
      }
    },function(response){
      console.log("Somthing went wrong");
    }); 


    MenuFac.active = 9;
    $scope.activePanel = MenuFac;
  }]);
  app.controller('NewProductPolicyCtl',['$scope','$timeout','$state','MenuFac','ProductPoliciesServ','HelperServ','toastr',function($scope,$timeout,$state,MenuFac,ProductPoliciesServ,HelperServ,toastr){
    MenuFac.active = 9;
    $scope.activePanel = MenuFac;
    $scope.activeTab = "tap1";
    $scope.objects = HelperServ;
    $scope.objects.getAllItems();
    $scope.objects.getAllServices();
    $scope.objects.getAllPackages();
    $scope.objects.getAllPolicies();
    console.log($scope.objects.servicesObj);
    $scope.newProductPolicyForm = {};
    $scope.newServiceProductPolicy = function(){
      $scope.newProductPolicyForm.type = "service";
      $scope.loadingStatus = true;
      ProductPoliciesServ.addProductPolicy($scope.newProductPolicyForm).then(function(response){
        if(response.data){
          $timeout(function () {
            $scope.loadingStatus = false;
            $scope.newProductPolicyForm = {};
            $state.go('productPoliciesService');
            toastr.success('تمت إضافة سياسة جديدة بنجاح');
          },3000);
        } else {
          console.log(response.data);
        }
      },function(response){
        console.log("Something went wrong");
      });
    };
    $scope.newItemProductPolicy = function(){
      $scope.newProductPolicyForm.type = "item";
      ProductPoliciesServ.addProductPolicy($scope.newProductPolicyForm).then(function(response){
        if(response.data){
          $state.go('productPoliciesItem');
          toastr.success('تمت إضافة سياسة جديدة بنجاح');
        } else {
          console.log(response.data);
        }
      },function(response){
        console.log("Something went wrong");
      });
    };
    $scope.newPackageProductPolicy = function(){
      $scope.newProductPolicyForm.type = "package";
      ProductPoliciesServ.addProductPolicy($scope.newProductPolicyForm).then(function(response){
        if(response.data){
          $state.go('productPoliciesPackage');
          toastr.success('تمت إضافة سياسة جديدة بنجاح');
        } else {
          console.log(response.data);
        }
      },function(response){
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditProductPolicyCtl',['$scope','MenuFac','ProductPoliciesServ',function($scope,MenuFac,ProductPoliciesServ){
    MenuFac.active = 9;
    $scope.activePanel = MenuFac;
  }]);

  app.controller('ProductPoliciesServiceCtl',['$scope','PermissionServ','$state','PoliciesServ','HelperServ','$stateParams','toastr','$modal','MenuFac','ProductPoliciesServ',function($scope,PermissionServ,$state,PoliciesServ,HelperServ,$stateParams,toastr,$modal,MenuFac,ProductPoliciesServ){
     PermissionServ.getSubpermission().then(function(response){
      $scope.permission =true;
      if(response.data[0] != undefined){
        console.log(response.data[12]);
        //employee
        $scope.permission =false;

        $scope.addProductPolicy =  response.data[12].add;
        $scope.deleteProductPolicy = response.data[12].delete; 
        $scope.editProductPolicy = response.data[12].edit; 
      } else {
        //admin
        $scope.addProductPolicy =  true;
        $scope.deleteProductPolicy = true; 
        $scope.editProductPolicy = true;
      }
    },function(response){
      console.log("Somthing went wrong");
    }); 


    MenuFac.active = 9;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.editPolicyServiceForm = {};
    $scope.objects = HelperServ;
    $scope.objects.getAllItems();
    $scope.objects.getAllServices();
    $scope.objects.getAllPackages();
    $scope.objects.getAllPolicies();
    ProductPoliciesServ.getProductPolicyByID($stateParams.id).then(function(response) {
      console.log(response.data);
      $scope.editPolicyServiceForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.editProductPolicy = function(){
      alert("dd");
      ProductPoliciesServ.editProductPolicy($stateParams.id,$scope.editPolicyServiceForm).then(function(response) {
        if(response.data){
          $state.go('productPoliciesService');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }

    $scope.init = function () {
      ProductPoliciesServ.getProductPolicies($scope.pageSize,$scope.currentPage,{type:"service"}).then(function(response) {
        $scope.policies = response.data.result;
        console.log($scope.policies);
        $scope.total = response.data.count;
        console.log($scope.total);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init();

     $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذه سياسات منتج (الخدمة)";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ProductPoliciesServ.deleteProductPolicy(id).then(function(response) {
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

  app.controller('ProductPoliciesItemCtl',['$scope','PermissionServ','$state','PoliciesServ','HelperServ','$stateParams','toastr','$modal','MenuFac','ProductPoliciesServ',function($scope,PermissionServ,$state,PoliciesServ,HelperServ,$stateParams,toastr,$modal,MenuFac,ProductPoliciesServ){
    // edit form data 
     PermissionServ.getSubpermission().then(function(response){
      $scope.permission =true;
      if(response.data[0] != undefined){
        console.log(response.data[12]);
        //employee
        $scope.permission =false;

        $scope.addProductPolicy =  response.data[12].add;
        $scope.deleteProductPolicy = response.data[12].delete; 
        $scope.editProductPolicy = response.data[12].edit; 
      } else {
        //admin
        $scope.addProductPolicy =  true;
        $scope.deleteProductPolicy = true; 
        $scope.editProductPolicy = true;
      }
    },function(response){
      console.log("Somthing went wrong");
    }); 

    MenuFac.active = 9;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.objects = HelperServ;
    $scope.objects.getAllItems();
    $scope.objects.getAllServices();
    $scope.objects.getAllPackages();
    $scope.objects.getAllPolicies();

    $scope.editPolicyItemForm ={};
    ProductPoliciesServ.getProductPolicyByID($stateParams.id).then(function(response) {
      console.log(response.data);
      $scope.editPolicyItemForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
      //edit function 
    $scope.editProductPolicy = function(){
      ProductPoliciesServ.editProductPolicy($stateParams.id,$scope.editPolicyItemForm).then(function(response) {
        if(response.data){
          $state.go('productPoliciesItem');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }

    $scope.init = function () {
      ProductPoliciesServ.getProductPolicies($scope.pageSize,$scope.currentPage,{type:"item"}).then(function(response) {
        $scope.policies = response.data.result;
        console.log($scope.policies);
        $scope.total = response.data.count;
        console.log($scope.total);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init();

    $scope.showDeleteModel = function(id){
        $scope.id = id;
        $scope.deleteName = "هذه سياسات منتج (المعدة)";
        $scope.deleteModel = $modal({
          scope: $scope,
          templateUrl: 'pages/model.delete.tpl.html',
          show: true
        });
    };
    $scope.confirmDelete = function(id){
      ProductPoliciesServ.deleteProductPolicy(id).then(function(response) {
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

  app.controller('ProductPoliciesPackageCtl',['$scope','PermissionServ','$state','PoliciesServ','HelperServ','$stateParams','toastr','$modal','MenuFac','ProductPoliciesServ',function($scope,PermissionServ,$state,PoliciesServ,HelperServ,$stateParams,toastr,$modal,MenuFac,ProductPoliciesServ){
    // edit form data 
      PermissionServ.getSubpermission().then(function(response){
      $scope.permission =true;
      if(response.data[0] != undefined){
        console.log(response.data[12]);
        //employee
        $scope.permission =false;

        $scope.addProductPolicy =  response.data[12].add;
        $scope.deleteProductPolicy = response.data[12].delete; 
        $scope.editProductPolicy = response.data[12].edit; 
      } else {
        //admin
        $scope.addProductPolicy =  true;
        $scope.deleteProductPolicy = true; 
        $scope.editProductPolicy = true;
      }
    },function(response){
      console.log("Somthing went wrong");
    });


    MenuFac.active = 9;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.objects = HelperServ;
    $scope.objects.getAllItems();
    $scope.objects.getAllServices();
    $scope.objects.getAllPackages();
    $scope.objects.getAllPolicies();
    $scope.init = function () {
      ProductPoliciesServ.getProductPolicies($scope.pageSize,$scope.currentPage,{type:"package"}).then(function(response) {
        $scope.policies = response.data.result;
        console.log($scope.policies);
        $scope.total = response.data.count;
        console.log($scope.total);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init();
    $scope.showDeleteModel = function(id){
        $scope.id = id;
        $scope.deleteName = "هذه سياسات منتج (الحزمة)";
        $scope.deleteModel = $modal({
          scope: $scope,
          templateUrl: 'pages/model.delete.tpl.html',
          show: true
        });
    };
    $scope.confirmDelete = function(id){
      ProductPoliciesServ.deleteProductPolicy(id).then(function(response) {
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

    $scope.editPolicyPackageForm ={};
    ProductPoliciesServ.getProductPolicyByID($stateParams.id).then(function(response) {
      console.log(response.data);
      $scope.editPolicyPackageForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    
    $scope.editProductPolicyy = function(){
      ProductPoliciesServ.editProductPolicy($stateParams.id,$scope.editPolicyPackageForm).then(function(response) {
        if(response.data){
          $state.go('productPoliciesPackage');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }




    /*$scope.editPolicyItemForm ={};
    ProductPoliciesServ.getProductPolicyByID($stateParams.id).then(function(response) {
      console.log(response.data);
      $scope.editPolicyItemForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
      //edit function 
    $scope.editProductPolicy = function(){
      ProductPoliciesServ.editProductPolicy($stateParams.id,$scope.editPolicyItemForm).then(function(response) {
        if(response.data){
          $state.go('productPoliciesItem');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }

    $scope.init = function () {
      ProductPoliciesServ.getProductPolicies($scope.pageSize,$scope.currentPage,{type:"item"}).then(function(response) {
        $scope.policies = response.data.result;
        console.log($scope.policies);
        $scope.total = response.data.count;
        console.log($scope.total);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init();

    $scope.showDeleteModel = function(id){
        $scope.id = id;
        $scope.deleteName = "هذه سياسات منتج (المعدة)";
        $scope.deleteModel = $modal({
          scope: $scope,
          templateUrl: 'pages/model.delete.tpl.html',
          show: true
        });
    };
    $scope.confirmDelete = function(id){
      ProductPoliciesServ.deleteProductPolicy(id).then(function(response) {
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
  
*/
}]);
}());

