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

    alert("hii");

  }])

  
    }());