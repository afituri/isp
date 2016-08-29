(function(){
  'use strict';
  var app = angular.module('isp');
  //permissionsCtl
  app.controller('permissionCtl',['$scope','toastr','CustomersServ','PermissionServ','$modal','$stateParams','MenuFac','InvoicesServ',function($scope,toastr,CustomersServ,PermissionServ,$modal,$stateParams,MenuFac,InvoicesServ){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function () {
     PermissionServ.getPermission($scope.pageSize,$scope.currentPage).then(function(response) {
        console.log(response.data);
        $scope.permissions = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
   }
   $scope.init();
   // delete permissions
   $scope.showDeleteModel = function(id){
    $scope.id = id;
    $scope.deleteName = "هذه الصلاحية";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    }

    $scope.confirmDelete = function(id){
      PermissionServ.deletePermission(id).then(function(response){
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
        console.log("Somthing went wrong");
      });
    } 
  }]);

  app.controller('newPermissionCtl',['$scope','toastr','$state','CustomersServ','PermissionServ','$modal','$stateParams','MenuFac','InvoicesServ',function($scope,toastr,$state,CustomersServ,PermissionServ,$modal,$stateParams,MenuFac,InvoicesServ){
      $scope.newPermission={}
      $scope.allDoller=true;

        $scope.newPermission.dollar={};
        $scope.newPermission.resselers={};
        $scope.newPermission.service={};
        $scope.newPermission.suppliers={};
        $scope.newPermission.serviceProviders={};
        $scope.newPermission.warehouses={};
        $scope.newPermission.instock={};

        $scope.newPermission.productServices={};
        $scope.newPermission.productItems={};
        $scope.newPermission.productPackages={};
        $scope.newPermission.customers={};

        $scope.newPermission.productPolicies={};
        $scope.newPermission.policies={};
        $scope.newPermission.invoice={};

        //productPolicies
        //policies
        //invoice

        $scope.newPermission.dollar.all=true;
        $scope.newPermission.dollar.add=true;
        $scope.newPermission.dollar.delete=true;

        $scope.newPermission.invoice.all=true;
        $scope.newPermission.invoice.add=true;
        $scope.newPermission.invoice.delete=true;


        var pages = ["resselers","service","suppliers","serviceProviders","warehouses","instock","productServices","productItems","productPackages","customers","productPolicies","policies"];
         for(var i=0;i<pages.length;i++){
          $scope.newPermission[pages[i]].add=true;
          $scope.newPermission[pages[i]].delete=true;
          $scope.newPermission[pages[i]].edit=true;
          $scope.newPermission[pages[i]].all=true;
         }
         console.log($scope.newPermission);
      


      $scope.newPerm = function(){
        console.log($scope.newPermission);
         PermissionServ.addPermssion($scope.newPermission).then(function(respones){
          $state.go('permissions');
          toastr.success('تمت إضافة الصلاحية بنجاح');
         },function(respones){
          console.log("Somthing went wrong");
         })
      }
    }]);
 

  app.controller('editPermissionCtl',['$scope','toastr','$state','CustomersServ','PermissionServ','$modal','$stateParams','MenuFac','InvoicesServ',function($scope,toastr,$state,CustomersServ,PermissionServ,$modal,$stateParams,MenuFac,InvoicesServ){
    $scope.editPermission={}
    PermissionServ.getPermissionByID($stateParams.id).then(function(response){
      $scope.editPermission.name = response.data.result.resultPer[0].name;
      $scope.editPermission.description = response.data.result.resultPer[0].description;
      //dollar 
  
      $scope.editPermission.dollar={}
      $scope.editPermission.dollar.add=response.data.result.resultSub[0].add;
      $scope.editPermission.dollar.delete=response.data.result.resultSub[0].delete;
      $scope.editPermission.dollar.all=response.data.result.resultSub[0].all;
      // 
      $scope.editPermission.resselers={}
      
      
      $scope.editPermission.resselers.add=response.data.result.resultSub[1].add;
      $scope.editPermission.resselers.delete=response.data.result.resultSub[1].delete;
      $scope.editPermission.resselers.all=response.data.result.resultSub[1].all;
      $scope.editPermission.resselers.edit=response.data.result.resultSub[1].edit;
      
      
      $scope.editPermission.invoice={}
      $scope.editPermission.invoice.add=response.data.result.resultSub[2].add;
      $scope.editPermission.invoice.delete=response.data.result.resultSub[2].delete;
      $scope.editPermission.invoice.all=response.data.result.resultSub[2].all;
      $scope.editPermission.invoice.edit=response.data.result.resultSub[2].edit;


    
      $scope.editPermission.service={}
      $scope.editPermission.service.add=response.data.result.resultSub[3].add;
      $scope.editPermission.service.delete=response.data.result.resultSub[3].delete;
      $scope.editPermission.service.all=response.data.result.resultSub[3].all;
      $scope.editPermission.service.edit=response.data.result.resultSub[3].edit;

       

      $scope.editPermission.suppliers={}
      $scope.editPermission.suppliers.add=response.data.result.resultSub[4].add;
      $scope.editPermission.suppliers.delete=response.data.result.resultSub[4].delete;
      $scope.editPermission.suppliers.all=response.data.result.resultSub[4].all;
      $scope.editPermission.suppliers.edit=response.data.result.resultSub[4].edit;

     

      $scope.editPermission.serviceProviders={}
      $scope.editPermission.serviceProviders.add=response.data.result.resultSub[5].add;
      $scope.editPermission.serviceProviders.delete=response.data.result.resultSub[5].delete;
      $scope.editPermission.serviceProviders.all=response.data.result.resultSub[5].all;
      $scope.editPermission.serviceProviders.edit=response.data.result.resultSub[5].edit;

      
      $scope.editPermission.warehouses={}
      $scope.editPermission.warehouses.add=response.data.result.resultSub[6].add;
      $scope.editPermission.warehouses.delete=response.data.result.resultSub[6].delete;
      $scope.editPermission.warehouses.all=response.data.result.resultSub[6].all;
      $scope.editPermission.warehouses.edit=response.data.result.resultSub[6].edit;

      
       $scope.editPermission.instock={}
      $scope.editPermission.instock.add=response.data.result.resultSub[7].add;
      $scope.editPermission.instock.delete=response.data.result.resultSub[7].delete;
      $scope.editPermission.instock.all=response.data.result.resultSub[7].all;
      $scope.editPermission.instock.edit=response.data.result.resultSub[7].edit;

      
      
      console.log(response.data.result.resultSub[8].pageName);
      $scope.editPermission.productServices={}
      $scope.editPermission.productServices.add=response.data.result.resultSub[8].add;
      $scope.editPermission.productServices.delete=response.data.result.resultSub[8].delete;
      $scope.editPermission.productServices.all=response.data.result.resultSub[8].all;
      $scope.editPermission.productServices.edit=response.data.result.resultSub[8].edit;
    
    
       console.log(response.data.result.resultSub[9].pageName);
      $scope.editPermission.productItems={}
      $scope.editPermission.productItems.add=response.data.result.resultSub[9].add;
      $scope.editPermission.productItems.delete=response.data.result.resultSub[9].delete;
      $scope.editPermission.productItems.all=response.data.result.resultSub[9].all;
      $scope.editPermission.productItems.edit=response.data.result.resultSub[9].edit;
      
      console.log(response.data.result.resultSub[10].pageName);
      $scope.editPermission.productPackages={}
      $scope.editPermission.productPackages.add=response.data.result.resultSub[10].add;
      $scope.editPermission.productPackages.delete=response.data.result.resultSub[10].delete;
      $scope.editPermission.productPackages.all=response.data.result.resultSub[10].all;
      $scope.editPermission.productPackages.edit=response.data.result.resultSub[10].edit;
      
      console.log(response.data.result.resultSub[11].pageName);
      
       $scope.editPermission.customers={}
      $scope.editPermission.customers.add=response.data.result.resultSub[11].add;
      $scope.editPermission.customers.delete=response.data.result.resultSub[11].delete;
      $scope.editPermission.customers.all=response.data.result.resultSub[11].all;
      $scope.editPermission.customers.edit=response.data.result.resultSub[11].edit;
  
      console.log(response.data.result.resultSub[12].pageName);

      $scope.editPermission.productPolicies={}
      $scope.editPermission.productPolicies.add=response.data.result.resultSub[12].add;
      $scope.editPermission.productPolicies.delete=response.data.result.resultSub[12].delete;
      $scope.editPermission.productPolicies.all=response.data.result.resultSub[12].all;
      $scope.editPermission.productPolicies.edit=response.data.result.resultSub[12].edit;

      console.log(response.data.result.resultSub[13].pageName);

      $scope.editPermission.policies={}
      $scope.editPermission.policies.add=response.data.result.resultSub[13].add;
      $scope.editPermission.policies.delete=response.data.result.resultSub[13].delete;
      $scope.editPermission.policies.all=response.data.result.resultSub[13].all;
      $scope.editPermission.policies.edit=response.data.result.resultSub[13].edit;

     


    },function(response){
      console.log("Somthing went wrong");
    });

    $scope.editPerm = function() {
      PermissionServ.editPermission($stateParams.id,$scope.editPermission).then(function(response){
        if(response.data){
          $state.go('permissions');
          toastr.success('تم تعديل الصلاحية بنجاح');
        }
      
      },function(response){
        console.log("Somthing went wrong");
      });
    }

  }]);

 }());