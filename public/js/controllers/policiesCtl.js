(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('PoliciesCtl',['$scope','PermissionServ','$modal','MenuFac','PoliciesServ','toastr',function($scope,PermissionServ,$modal,MenuFac,PoliciesServ,toastr){
     PermissionServ.getSubpermission().then(function(response){
      $scope.permission =true;
      if(response.data[0] != undefined){
        console.log(response.data[13]);
        //employee
        $scope.permission =false;

        $scope.addPolicy=  response.data[13].add;
        $scope.deletePolicy = response.data[13].delete; 
        $scope.editPolicy = response.data[13].edit; 
      } else {
        //admin
        $scope.addPolicy =  true;
        $scope.deletePolicy = true; 
        $scope.editPolicy = true;
      }
    },function(response){
      console.log("Somthing went wrong");
    }); 





/*    $scope.searchP = function(search){
      PoliciesServ.searchPolicy(search).then(function(response){
        // result
        if(search==""){
          $scope.init();
        } else {
        $scope.policies= response;
      },function(response){
        console.log("Something went wrong")
      })
    }
    }*/

    MenuFac.active = 8;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function () {
      PoliciesServ.getPolicies($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.policies = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذه السياسة";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      PoliciesServ.deletePolicy(id).then(function(response) {
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
 
  app.controller('NewPolicyCtl',['$scope','$timeout','$state','MenuFac','PoliciesServ','toastr',function($scope,$timeout,$state,MenuFac,PoliciesServ,toastr){
    MenuFac.active = 8;
    $scope.activePanel = MenuFac;
    $scope.newPolicyForm = {};
    $scope.newPolicy = function(){
      $scope.loadingStatus = true;
      PoliciesServ.addPolicy($scope.newPolicyForm).then(function(response) {
        if(response.data){
          $timeout(function () {
            $scope.loadingStatus = false;
            $scope.newPolicyForm = {};
            $state.go('policies');
            toastr.success('تمت إضافة سياسة جديدة بنجاح');
          },3000);
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
 
  app.controller('EditPolicyCtl',['$scope','$state','$stateParams','MenuFac','PoliciesServ','toastr',function($scope,$state,$stateParams,MenuFac,PoliciesServ,toastr){
    MenuFac.active = 8;
    $scope.activePanel = MenuFac;
    $scope.editPolicyForm = {};
    PoliciesServ.getPolicyByID($stateParams.id).then(function(response) {
      $scope.editPolicyForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editPolicy = function(){
      PoliciesServ.editPolicy($stateParams.id,$scope.editPolicyForm).then(function(response) {
        if(response.data){
          $state.go('policies');
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