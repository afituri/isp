(function(){
  'use strict';
  var app = angular.module('isp',['jcs-autoValidate']);
  app.run(['defaultErrorMessageResolver', function (defaultErrorMessageResolver){
    defaultErrorMessageResolver.setI18nFileRootPath('/lang');
    defaultErrorMessageResolver.setCulture('ar-ly');
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
      errorMessages['emailType'] = "الرجاء إدخال البريد الالكتروني";
      errorMessages['password'] = "الرجاء إدخال كلمة المرور";
    });
  }]);
  app.controller('LoginCtl',['$scope','$http',function($scope,$http){
    $scope.loginForm = {};
    $scope.login = function(){
      $http.post('/user/login',{
        'username': $scope.loginForm.email,
        'password': $scope.loginForm.password
      }).then(function(response) {
        //First function handles success
        console.log(response.data);
        window.location.replace('/home');
      }, function(response) {
        //Second function handles error
        console.log("Something went wrong");
      });
    }
  }]);
}());