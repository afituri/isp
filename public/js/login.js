(function(){
  'use strict';

  var app = angular.module('isp',['jcs-autoValidate','toastr']);
  app.run(['defaultErrorMessageResolver', function (defaultErrorMessageResolver){
    defaultErrorMessageResolver.setI18nFileRootPath('/lang');
    defaultErrorMessageResolver.setCulture('ar-ly');
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
      errorMessages['emailType'] = "الرجاء إدخال البريد الالكتروني";
      errorMessages['password'] = "الرجاء إدخال كلمة المرور";
    });
  }]);
  app.controller('LoginCtl',['$scope','$http','toastr',function($scope,$http,toastr){
    $scope.loginForm = {};
    $scope.login = function(){
      $http.post('/user/login',{
        'username': $scope.loginForm.email,
        'password': $scope.loginForm.password
      }).then(function(response) {
        //First function handles success
        if(response.data.admin == undefined){
         toastr.error('خطأ : اسم المستخدم او كلمة المرور غير صحيح');
        } else {
        if(response.data.admin==true){
          window.location.replace('/home');  
        }else if(response.data.admin==false){
          window.location.replace('/reseller');
        }
      }
        
      }, function(response) {
        //Second function handles error
        console.log("Something went wrong");
      });
    }
  }]);
}());