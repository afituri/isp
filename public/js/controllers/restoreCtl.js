(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('RestoreCtl',['$scope','CSVServ','toastr',function($scope,CSVServ,toastr){
    $scope.csv = {
      result: null,
      encoding: 'UTF-8',
    };
    $scope.CSVResult = false;
    $scope.addCSV = function(){
      if($scope.csv.result == null){
        $scope.CSVResult = true;
      } else {
        CSVServ.addCSVFile($scope.csv.result).then(function(response) {
          if(response.data){
            console.log(response.data);
            toastr.success('تمت استعادة ملف CSV بنجاح');
          } else {
            console.log(response.data);
          }
        }, function(response) {
          console.log("Something went wrong");
        });
      }
    };
  }]);
}());