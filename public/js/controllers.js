(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('HomeCtl',['$scope',function($scope){
  }]);
  app.controller('MenuCtl',['$scope','MenuFac',function($scope,MenuFac){
    $scope.activePanel = MenuFac;
  }]);
  app.controller('ResellersCtl',['$scope','ResllersServ','MenuFac',function($scope,ResllersServ,MenuFac){
    MenuFac.active = 0;
    ResllersServ.getResellers();
    $scope.resellers = ResllersServ;
  }]);
  app.controller('NewResellerCtl',['$scope','$state','MenuFac','ResllersServ','toastr', function($scope,$state,MenuFac,ResllersServ,toastr){
    MenuFac.active = 0;
    $scope.newResllerForm = {};
    $scope.newResller = function(){
      ResllersServ.addResller($scope.newResllerForm).then(function(response) {
        if(response.data){
          $state.go('resellers');
          toastr.success('تمت إضافة موزع جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);
  app.controller('EditResellerCtl',['$scope','$stateParams','ResllersServ','MenuFac','toastr',function($scope,$stateParams,ResllersServ,MenuFac,toastr){
    MenuFac.active = 0;
    $scope.editResllerForm = {};
    ResllersServ.getResellersByID($stateParams.id).then(function(response) {
      $scope.editResllerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editResller = function(){
      ResllersServ.editResller($stateParams.id,$scope.editResllerForm).then(function(response) {
        if(response.data){
          $state.go('resellers');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);
  app.controller('ShowResellerCtl',['$scope','$stateParams','ResllersServ','MenuFac',function($scope,$stateParams,ResllersServ,MenuFac){
    MenuFac.active = 0;
    $scope.showResllerForm = {};
    ResllersServ.getResellersByID($stateParams.id).then(function(response) {
      $scope.showResllerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  // Service Providers Controllers Start
  app.controller('ServiceProvidersCtl',['$scope','MenuFac','ServiceProvidersServ',function($scope,MenuFac,ServiceProvidersServ){
    MenuFac.active = 1;
    $scope.activePanel = MenuFac;
    ServiceProvidersServ.getServiceProviders();
    $scope.serviceProviders = ServiceProvidersServ;
  }]);
  app.controller('NewServiceProviderCtl',['$scope','$state','MenuFac','ServiceProvidersServ','toastr',function($scope,$state,MenuFac,ServiceProvidersServ,toastr){
    MenuFac.active = 1;
    $scope.activePanel = MenuFac;
    $scope.newServiceProviderForm = {};
    $scope.newServiceProvider = function(){
      ServiceProvidersServ.addServiceProvider($scope.newServiceProviderForm).then(function(response) {
        if(response.data){
          $state.go('serviceProviders');
          toastr.success('تمت إضافة مزود خدمة جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditServiceProviderCtl',['$scope','$stateParams','$state','MenuFac','ServiceProvidersServ','toastr',function($scope,$stateParams,$state,MenuFac,ServiceProvidersServ,toastr){
    MenuFac.active = 1;
    $scope.activePanel = MenuFac;
    $scope.editServiceProviderForm = {};
    ServiceProvidersServ.getServiceProviderByID($stateParams.id).then(function(response) {
      $scope.editServiceProviderForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editServiceProvider = function(){
      ServiceProvidersServ.editServiceProvider($stateParams.id,$scope.editServiceProviderForm).then(function(response) {
        if(response.data){
          $state.go('serviceProviders');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);
  app.controller('DetailServiceProviderCtl',['$scope','$stateParams','MenuFac','ServiceProvidersServ',function($scope,$stateParams,MenuFac,ServiceProvidersServ){
    MenuFac.active = 1;
    $scope.activePanel = MenuFac;
    $scope.services = {};
    $scope.detailServiceProvidersForm = {};
    ServiceProvidersServ.getServiceProviderByID($stateParams.id).then(function(response) {
      $scope.detailServiceProviderForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    ServiceProvidersServ.getServiceProvidersServicesByID($stateParams.id).then(function(response) {
      $scope.services = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  // Service Providers Controllers End
  // Service Controllers Start
  app.controller('ServicesCtl',['$scope','MenuFac','ServicesServ',function($scope,MenuFac,ServicesServ){
    MenuFac.active = 2;
    $scope.activePanel = MenuFac;
    $scope.services = ServicesServ;
  }]);
  app.controller('NewServiceCtl',['$scope','MenuFac','ServiceProvidersServ','ServicesServ','toastr',function($scope,MenuFac,ServiceProvidersServ,ServicesServ,toastr){
    MenuFac.active = 2;
    $scope.activePanel = MenuFac;
    $scope.serviceProviders = ServiceProvidersServ;
    $scope.newServiceForm = {};
    $scope.newService = function(){
      ServicesServ.addService($scope.newServiceForm).then(function(response) {
        console.log(response.data);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditServiceCtl',['$scope','$stateParams','MenuFac','ServicesServ','ServiceProvidersServ','toastr',function($scope,$stateParams,MenuFac,ServicesServ,ServiceProvidersServ,toastr){
    MenuFac.active = 2;
    $scope.activePanel = MenuFac;
    $scope.editServiceForm = {};
    $scope.serviceProviders = ServiceProvidersServ;
    ServicesServ.getServiceByID($stateParams.id).then(function(response) {
      $scope.editServiceForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  // Service Controllers End
  // Suppliers Controllers Start
  app.controller('SuppliersCtl',['$scope','MenuFac','SuppliersServ',function($scope,MenuFac,SuppliersServ){
    MenuFac.active = 3;
    $scope.activePanel = MenuFac;
    $scope.suppliers = SuppliersServ;
  }]);
  app.controller('NewSupplierCtl',['$scope','MenuFac','SuppliersServ','toastr',function($scope,MenuFac,SuppliersServ,toastr){
    MenuFac.active = 3;
    $scope.activePanel = MenuFac;
    $scope.newSupplierForm = {};
    $scope.newSupplier = function(){
      SuppliersServ.addSupplier($scope.newSupplierForm).then(function(response) {
        console.log(response.data);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditSupplierCtl',['$scope','$stateParams','MenuFac','SuppliersServ','toastr',function($scope,$stateParams,MenuFac,SuppliersServ,toastr){
    MenuFac.active = 3;
    $scope.activePanel = MenuFac;
    $scope.editSupplierForm = {};
    SuppliersServ.getSupplierByID($stateParams.id).then(function(response) {
      $scope.editSupplierForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  // Suppliers Controllers End
  // Warehouses Controllers Start
  app.controller('WarehousesCtl',['$scope','MenuFac','WarehousesServ',function($scope,MenuFac,WarehousesServ){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    $scope.warehouses = WarehousesServ;
  }]);
  app.controller('NewWarehouseCtl',['$scope','MenuFac','WarehousesServ','toastr',function($scope,MenuFac,WarehousesServ,toastr){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    $scope.newWarehouseForm = {};
    $scope.newWarehouse = function(){
      WarehousesServ.addWarehouse($scope.newWarehouseForm).then(function(response) {
        console.log(response.data);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditWarehouseCtl',['$scope','$stateParams','MenuFac','WarehousesServ','toastr',function($scope,$stateParams,MenuFac,WarehousesServ,toastr){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    $scope.editWarehouseForm = {};
    WarehousesServ.getWarehouseByID($stateParams.id).then(function(response) {
      $scope.editWarehouseForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  // Warehouses Controllers End
  // Customers Controllers End
  app.controller('CustomersCtl',['$scope','MenuFac','CustomersServ',function($scope,MenuFac,CustomersServ){
    MenuFac.active = 5;
    $scope.activePanel = MenuFac;
    $scope.customers = CustomersServ;
  }]);
  app.controller('NewCustomerCtl',['$scope','MenuFac','CustomersServ','toastr',function($scope,MenuFac,CustomersServ,toastr){
    MenuFac.active = 5;
    $scope.activePanel = MenuFac;
    $scope.newCustomerForm = {};
    $scope.newCustomer = function(){
      CustomersServ.addCustomer($scope.newCustomerForm).then(function(response) {
        console.log(response.data);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditCustomerCtl',['$scope','$stateParams','MenuFac','CustomersServ','toastr',function($scope,$stateParams,MenuFac,CustomersServ,toastr){
    MenuFac.active = 5;
    $scope.activePanel = MenuFac;
    $scope.editCustomerForm = {};
    CustomersServ.getCustomerByID($stateParams.id).then(function(response) {
      $scope.editCustomerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  // Customers Controllers End
}())