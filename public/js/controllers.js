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
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function () {
      ResllersServ.getResellers($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.resellers = response.data.result;
        console.log($scope.resellers);
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
  }]);
  app.controller('NewResellerCtl',['$scope','$state','MenuFac','ResllersServ','CitiesServ','toastr', function($scope,$state,MenuFac,ResllersServ,CitiesServ,toastr){
    MenuFac.active = 0;
    $scope.newResllerForm = {};
    $scope.cities = CitiesServ;
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
  app.controller('EditResellerCtl',['$scope','$state','$stateParams','ResllersServ','MenuFac','CitiesServ','toastr',function($scope,$state,$stateParams,ResllersServ,MenuFac,CitiesServ,toastr){
    MenuFac.active = 0;
    $scope.editResllerForm = {};
    $scope.cities = CitiesServ;
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
  app.controller('NewServiceCtl',['$scope','$state','MenuFac','ServiceProvidersServ','ServicesServ','toastr',function($scope,$state,MenuFac,ServiceProvidersServ,ServicesServ,toastr){
    MenuFac.active = 2;
    $scope.activePanel = MenuFac;
    $scope.serviceProviders = ServiceProvidersServ;
    $scope.newServiceForm = {};
    $scope.newService = function(){
      ServicesServ.addService($scope.newServiceForm).then(function(response) {
        if(response.data){
          $state.go('services');
          toastr.success('تمت إضافة خدمة جديدة بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditServiceCtl',['$scope','$state','$stateParams','MenuFac','ServicesServ','ServiceProvidersServ','toastr',function($scope,$state,$stateParams,MenuFac,ServicesServ,ServiceProvidersServ,toastr){
    MenuFac.active = 2;
    $scope.activePanel = MenuFac;
    $scope.editServiceForm = {};
    $scope.serviceProviders = ServiceProvidersServ;
    ServicesServ.getServiceByID($stateParams.id).then(function(response) {
      $scope.editServiceForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editService = function(){
      ServicesServ.editService($stateParams.id,$scope.editServiceForm).then(function(response) {
        if(response.data){
          $state.go('services');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);
  // Service Controllers End
  // Suppliers Controllers Start
  app.controller('SuppliersCtl',['$scope','MenuFac','SuppliersServ',function($scope,MenuFac,SuppliersServ){
    MenuFac.active = 3;
    $scope.activePanel = MenuFac;
    SuppliersServ.getSuppliers();
    $scope.suppliers = SuppliersServ;
  }]);
  app.controller('NewSupplierCtl',['$scope','$state','MenuFac','SuppliersServ','toastr',function($scope,$state,MenuFac,SuppliersServ,toastr){
    MenuFac.active = 3;
    $scope.activePanel = MenuFac;
    $scope.newSupplierForm = {};
    $scope.newSupplier = function(){
      SuppliersServ.addSupplier($scope.newSupplierForm).then(function(response) {
        if(response.data){
          $state.go('suppliers');
          toastr.success('تمت إضافة مورد جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditSupplierCtl',['$scope','$state','$stateParams','MenuFac','SuppliersServ','toastr',function($scope,$state,$stateParams,MenuFac,SuppliersServ,toastr){
    MenuFac.active = 3;
    $scope.activePanel = MenuFac;
    $scope.editSupplierForm = {};
    SuppliersServ.getSupplierByID($stateParams.id).then(function(response) {
      $scope.editSupplierForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editService = function(){
      SuppliersServ.editSupplier($stateParams.id,$scope.editSupplierForm).then(function(response) {
        if(response.data){
          $state.go('suppliers');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);
  // Suppliers Controllers End
  // Warehouses Controllers Start
  app.controller('WarehousesCtl',['$scope','MenuFac','WarehousesServ',function($scope,MenuFac,WarehousesServ){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    WarehousesServ.getWarehouses();
    $scope.warehouses = WarehousesServ;
  }]);
  app.controller('NewWarehouseCtl',['$scope','$state','MenuFac','WarehousesServ','toastr',function($scope,$state,MenuFac,WarehousesServ,toastr){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    $scope.newWarehouseForm = {};
    $scope.newWarehouse = function(){
      WarehousesServ.addWarehouse($scope.newWarehouseForm).then(function(response) {
        if(response.data){
          $state.go('warehouses');
          toastr.success('تمت إضافة مخزن جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditWarehouseCtl',['$scope','$state','$stateParams','MenuFac','WarehousesServ','toastr',function($scope,$state,$stateParams,MenuFac,WarehousesServ,toastr){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    $scope.editWarehouseForm = {};
    WarehousesServ.getWarehouseByID($stateParams.id).then(function(response) {
      $scope.editWarehouseForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editWarehouse = function(){
      WarehousesServ.editWarehouse($stateParams.id,$scope.editSupplierForm).then(function(response) {
        if(response.data){
          $state.go('warehouses');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);
  // Warehouses Controllers End
  // Customers Controllers End
  app.controller('CustomersCtl',['$scope','MenuFac','CustomersServ',function($scope,MenuFac,CustomersServ){
    MenuFac.active = 5;
    $scope.activePanel = MenuFac;
    CustomersServ.getCustomers();
    $scope.customers = CustomersServ;
  }]);
  app.controller('NewCustomerCtl',['$scope','$state','MenuFac','CustomersServ','CitiesServ','toastr',function($scope,$state,MenuFac,CustomersServ,CitiesServ,toastr){
    MenuFac.active = 5;
    $scope.activePanel = MenuFac;
    $scope.newCustomerForm = {};
    $scope.cities = CitiesServ;
    $scope.newCustomer = function(){
      CustomersServ.addCustomer($scope.newCustomerForm).then(function(response) {
        if(response.data){
          $state.go('customers');
          toastr.success('تمت إضافة زبون جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditCustomerCtl',['$scope','$state','$stateParams','MenuFac','CustomersServ','CitiesServ','toastr',function($scope,$state,$stateParams,MenuFac,CustomersServ,CitiesServ,toastr){
    MenuFac.active = 5;
    $scope.activePanel = MenuFac;
    $scope.editCustomerForm = {};
    $scope.cities = CitiesServ;
    CustomersServ.getCustomerByID($stateParams.id).then(function(response) {
      $scope.editCustomerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editCustomer = function(){
      CustomersServ.editCustomer($stateParams.id,$scope.editCustomerForm).then(function(response) {
        if(response.data){
          $state.go('customers');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);
  // Customers Controllers End
}())