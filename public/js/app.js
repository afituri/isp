(function(){
  'use strict';
  var app = angular.module('isp',[
    'mgcrea.ngStrap',
    'ngAnimate',
    'jcs-autoValidate'
    ]);
  app.run(['defaultErrorMessageResolver', function (defaultErrorMessageResolver){
    defaultErrorMessageResolver.setI18nFileRootPath('/lang');
    defaultErrorMessageResolver.setCulture('ar-ly');
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
      errorMessages['emailType'] = "الرجاء إدخال البريد الالكتروني";
      errorMessages['password'] = "الرجاء إدخال كلمة المرور";
      errorMessages['confirmPassword'] = "الرجاء إعادة ادخال كلمة المرور";
      errorMessages['storeName'] = "الرجاء إدخال اسم المحل";
      errorMessages['ownerName'] = "الرجاء إدخال اسم صاحب المحل";
      errorMessages['country'] = "الرجاء إختيار المدينة";
      errorMessages['location'] = "الرجاء إدخال المنطقة";
      errorMessages['phone'] = "الرجاء إدخال رقم الهاتف";
    });
  }]);
  app.controller('AuthCtl',['$scope','$http',function($scope,$http){
    $scope.loginForm = {};
    $scope.registerForm = {};
    $scope.countries = [{
      "id":1,
      "name":"طرابلس"
    }];
    $scope.login = function(){
      $http.post('/user/login',{ 
        $scope.loginForm
      }).success(function (result){
        console.log(result);
      }).error(function (data, status){
        console.log(data);
      });
    }
    $scope.register = function(){
      console.log("It's registered!");
    }
  }]);
}());