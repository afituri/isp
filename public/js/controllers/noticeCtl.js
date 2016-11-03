(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('newNoticeCtl',['$scope','NoticeServ','$timeout','$modal','$stateParams','ProductsServ','InStockServ','$state','MenuFac','HelperServ','toastr',function($scope,NoticeServ,$timeout,$modal,$stateParams,ProductsServ,InStockServ,$state,MenuFac,HelperServ,toastr){
    $scope.newNoticeForm = {};
    $scope.newNotice = function() {
      NoticeServ.addNotice($scope.newNoticeForm).then(function(response) {
      if(response.data){
        $timeout(function () {
          $scope.newNoticeForm = {};
          $state.go('notice');
          toastr.success('تمت إضافة التنبيه بنجاح');
        },3000);
      } else {
        console.log(response.data);
      }
    }, function(response) {
      console.log("Something went wrong");
    });
  }
  }]);

  //noticesCtl
  app.controller('noticeCtl',['$scope','NoticeServ','$timeout','$modal','$stateParams','ProductsServ','InStockServ','$state','MenuFac','HelperServ','toastr',function($scope,NoticeServ,$timeout,$modal,$stateParams,ProductsServ,InStockServ,$state,MenuFac,HelperServ,toastr){
     $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
     $scope.init = function () {
    NoticeServ.getAllNotice($scope.pageSize,$scope.currentPage).then(function(response){
      $scope.Notices = response.data.result;
      $scope.total = response.data.count;
    },function(response){
      console.log("Somthing went wrong");
    });
  };
  $scope.init();


   $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا التنبيه";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      NoticeServ.deleteNotice(id).then(function(response) {
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











  }])

  
    }());