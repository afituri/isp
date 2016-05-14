(function(){
  'use strict';
  var app = angular.module('isp');
  app.controller('HomeCtl',['$scope','MenuFac',function($scope,MenuFac){
    MenuFac.active = -1;
    $scope.activePanel = MenuFac;
  }]);
  app.controller('MenuCtl',['$scope','MenuFac',function($scope,MenuFac){
    $scope.activePanel = MenuFac;
  }]);
  // Service Providers Controllers Start
  app.controller('ServiceProvidersCtl',['$scope','$modal','MenuFac','ServiceProvidersServ','toastr',function($scope,$modal,MenuFac,ServiceProvidersServ,toastr){
    MenuFac.active = 0;
    $scope.activePanel = MenuFac;
    ServiceProvidersServ.getServiceProviders();
    $scope.serviceProviders = ServiceProvidersServ;
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "مزود الخدمة هذا";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ServiceProvidersServ.deleteServiceProvider(id).then(function(response) {
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
  }]);
  app.controller('NewServiceProviderCtl',['$scope','$state','MenuFac','ServiceProvidersServ','toastr',function($scope,$state,MenuFac,ServiceProvidersServ,toastr){
    MenuFac.active = 0;
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
    MenuFac.active = 0;
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
    MenuFac.active = 0;
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
  app.controller('ServicesCtl',['$scope','$modal','MenuFac','ServicesServ','toastr',function($scope,$modal,MenuFac,ServicesServ,toastr){
    MenuFac.active = 1;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function () {
      ServicesServ.getServices($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.services = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذه الخدمة";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ServicesServ.deleteService(id).then(function(response) {
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
  }]);
  app.controller('NewServiceCtl',['$scope','$state','MenuFac','ServiceProvidersServ','ServicesServ','toastr',function($scope,$state,MenuFac,ServiceProvidersServ,ServicesServ,toastr){
    MenuFac.active = 1;
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
    MenuFac.active = 1;
    $scope.activePanel = MenuFac;
    $scope.editServiceForm = {};
    $scope.serviceProviders = ServiceProvidersServ;
    ServicesServ.getServiceByID($stateParams.id).then(function(response) {
      $scope.editServiceForm = response.data;
      console.log($scope.editServiceForm);
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
  // Service Resellers Controllers Start
  app.controller('ResellersCtl',['$scope','HelperServ','$modal','ResllersServ','MenuFac','toastr',function($scope,HelperServ,$modal,ResllersServ,MenuFac,toastr){
    MenuFac.active = 2;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    HelperServ.getAllCities();
    $scope.cityObject = HelperServ;
    $scope.init = function () {
      ResllersServ.getResellers($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.resellers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا الموزع";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ResllersServ.deleteResller(id).then(function(response) {
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
  }]);
  app.controller('NewResellerCtl',['$scope','$state','MenuFac','ResllersServ','HelperServ','toastr', function($scope,$state,MenuFac,ResllersServ,HelperServ,toastr){
    MenuFac.active = 2;
    $scope.newResllerForm = {};
    $scope.objects = HelperServ;
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
  app.controller('EditResellerCtl',['$scope','$state','$stateParams','ResllersServ','MenuFac','HelperServ','toastr',function($scope,$state,$stateParams,ResllersServ,MenuFac,HelperServ,toastr){
    MenuFac.active = 2;
    $scope.editResllerForm = {};
    $scope.objects = HelperServ;
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
    MenuFac.active = 2;
    $scope.showResllerForm = {};
    ResllersServ.getResellersByID($stateParams.id).then(function(response) {
      $scope.showResllerForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);
  // Service Resellers Controllers End
  // Suppliers Controllers Start
  app.controller('SuppliersCtl',['$scope','$modal','MenuFac','SuppliersServ','toastr',function($scope,$modal,MenuFac,SuppliersServ,toastr){
    MenuFac.active = 3;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function () {
      SuppliersServ.getSuppliers($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.suppliers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا المورد";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      SuppliersServ.deleteSupplier(id).then(function(response) {
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
    //44444
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
  app.controller('WarehousesCtl',['$scope','$modal','HelperServ','MenuFac','WarehousesServ','toastr',function($scope,$modal,HelperServ,MenuFac,WarehousesServ,toastr){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    HelperServ.getAllCities();
    $scope.cityObject = HelperServ;
    $scope.init = function () {
      WarehousesServ.getWarehouses($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.warehouses = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا المخزن";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      WarehousesServ.deleteWarehouse(id).then(function(response) {
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
  }]);
  app.controller('NewWarehouseCtl',['$scope','$state','MenuFac','WarehousesServ','HelperServ','toastr',function($scope,$state,MenuFac,WarehousesServ,HelperServ,toastr){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    $scope.objects = HelperServ;
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
  app.controller('EditWarehouseCtl',['$scope','$state','$stateParams','MenuFac','WarehousesServ','HelperServ','toastr',function($scope,$state,$stateParams,MenuFac,WarehousesServ,HelperServ,toastr){
    MenuFac.active = 4;
    $scope.activePanel = MenuFac;
    $scope.editWarehouseForm = {};
    $scope.objects = HelperServ;
    WarehousesServ.getWarehouseByID($stateParams.id).then(function(response) {
console.log(response.data);
      $scope.editWarehouseForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editWarehouse = function(){
      WarehousesServ.editWarehouse($stateParams.id,$scope.editWarehouseForm).then(function(response) {
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
  app.controller('CustomersCtl',['$scope','$modal','MenuFac','CustomersServ','toastr',function($scope,$modal,MenuFac,CustomersServ,toastr){
    MenuFac.active = 5;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function () {
      CustomersServ.getCustomers($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.customers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا الزبون";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      CustomersServ.deleteCustomer(id).then(function(response) {
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
  }]);
  app.controller('NewCustomerCtl',['$scope','$state','MenuFac','CustomersServ','HelperServ','toastr',function($scope,$state,MenuFac,CustomersServ,HelperServ,toastr){
    MenuFac.active = 5;
    $scope.activePanel = MenuFac;
    $scope.newCustomerForm = {};
    $scope.objects = HelperServ;
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
  app.controller('EditCustomerCtl',['$scope','$state','$stateParams','MenuFac','CustomersServ','HelperServ','toastr',function($scope,$state,$stateParams,MenuFac,CustomersServ,HelperServ,toastr){
    MenuFac.active = 5;
    $scope.activePanel = MenuFac;
    $scope.editCustomerForm = {};
    $scope.objects = HelperServ;
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

  app.controller('ProductServicesCtl',['$scope','$state','$stateParams','$modal','MenuFac','ProductsServ','toastr',function($scope,$state,$stateParams,$modal,MenuFac,ProductsServ,toastr){
    MenuFac.active = 6;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.editProductServiceForm = {};
    ProductsServ.getProductServiceByID($stateParams.id).then(function(response) {
      console.log(response.data);
      $scope.editProductServiceForm = response.data[0];
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editProductService = function(){
      ProductsServ.editProductService($stateParams.id,$scope.editProductServiceForm).then(function(response) {
        if(response.data){
          $state.go('productServices');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init = function () {
      ProductsServ.getProductServices($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.productServices = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "منتج الخدمة";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ProductsServ.deleteProductService(id).then(function(response) {
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
  }]);


  app.controller('ProductItemsCtl',['$scope','$state','$stateParams','HelperServ','$modal','MenuFac','ProductsServ','toastr',function($scope,$state,$stateParams,HelperServ,$modal,MenuFac,ProductsServ,toastr){
    MenuFac.active = 6;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
     HelperServ.getAllSuppliers();
    $scope.objects = HelperServ;
    HelperServ.getAllCities();
    $scope.cityObject = HelperServ;

    $scope.init = function () {
      ProductsServ.getProductItems($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.productItems = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.editProductItemForm = {};
    ProductsServ.getProductServiceByID($stateParams.id,$scope.editProductItemForm).then(function(response) {

      $scope.editProductItemForm = response.data[0];
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.editProductItems = function(){
      var objCity=angular.element('#country').val();
      console.log(objCity.slice(7,objCity.length));
      $scope.editProductItemForm.city=objCity.slice(7,objCity.length);
      ProductsServ.editProductItem($stateParams.id,$scope.editProductItemForm).then(function(response) {
        if(response.data){
          $state.go('productItems');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }

    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا المنتج (المعدة)";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ProductsServ.deleteProductService(id).then(function(response) {
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
  }]);


  app.controller('ProductPackagesCtl',['$scope','$state','ServicesServ','HelperServ','$stateParams','$modal','MenuFac','ProductsServ','toastr',function($scope,$state,ServicesServ,HelperServ,$stateParams,$modal,MenuFac,ProductsServ,toastr){
    MenuFac.active = 6;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
     HelperServ.getAllSuppliers();
    $scope.objects = HelperServ;
    console.log($scope.objects);
    $scope.activeTab = "tap1";
    ServicesServ.getAllServices().then(function(response){
        $scope.ObjService=response.data;
    },function(response){
        console.log("Something went wrong");
      });
    $scope.init = function () {
      ProductsServ.getProductPackages($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.products = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();

    $scope.editProductPackageForm = {};
    ProductsServ.getProductServiceByID($stateParams.id,$scope.editProductItemForm).then(function(response) {

      $scope.editProductPackageForm = response.data[0];
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.editProductPackages = function(){
      /*var objCity=angular.element('#country').val();
      console.log(objCity.slice(7,objCity.length));
      $scope.editProductItemForm.city=objCity.slice(7,objCity.length);*/
      ProductsServ.editProductPackage($stateParams.id,$scope.editProductPackageForm).then(function(response) {
        if(response.data){
          $state.go('productPackages');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }


    $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذا المنتج (حزمة)";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ProductsServ.deleteProductService(id).then(function(response) {
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
  }]);
  
  app.controller('NewProductCtl',['$scope','ServicesServ','$state','MenuFac','ProductsServ','HelperServ','toastr',function($scope,ServicesServ,$state,MenuFac,ProductsServ,HelperServ,toastr){
    MenuFac.active = 6;
    
    $scope.activePanel = MenuFac;
    $scope.newProductForm = {};
    HelperServ.getAllSuppliers();
    $scope.objects = HelperServ;
    console.log($scope.objects);
    $scope.activeTab = "tap1";
    ServicesServ.getAllServices().then(function(response){
        $scope.ObjService=response.data;
    },function(response){
        console.log("Something went wrong");
      });
    $scope.getServiceByID = function(id){
      HelperServ.getServiceProvidersServicesByID(id).then(function(response){
        $scope.serviceProviderOfservices = response.data;
      },function(response){
        console.log("Something went wrong");
      })
    };
    $scope.newServiceProduct = function(){
      $scope.newProductForm.type = "service";
      ProductsServ.addProduct($scope.newProductForm).then(function(response) {
        if(response.data){
          $state.go('productServices');
          toastr.success('تمت إضافة منتج جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.newItemProduct = function(){
      $scope.newProductForm.type = "item";
      ProductsServ.addProduct($scope.newProductForm).then(function(response) {
        if(response.data){
          $state.go('productItems');
          toastr.success('تمت إضافة منتج جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.newPackageProduct = function(){
      $scope.newProductForm.type = "package";
      ProductsServ.addProduct($scope.newProductForm).then(function(response) {
        if(response.data){
          $state.go('productPackages');
          toastr.success('تمت إضافة منتج جديد بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);

  app.controller('EditProductCtl',['$scope','$state','$stateParams','MenuFac','ProductsServ','HelperServ','toastr',function($scope,$state,$stateParams,MenuFac,ProductsServ,HelperServ,toastr){
    MenuFac.active = 6;
    $scope.activePanel = MenuFac;
    $scope.editProductForm = {};
    HelperServ.getAllServices();
    HelperServ.getAllSuppliers();
    $scope.objects = HelperServ;
    ProductsServ.getProductByID($stateParams.id).then(function(response) {
      $scope.editProductForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editProduct = function(){
      ProductsServ.editProduct($stateParams.id,$scope.editProductForm).then(function(response) {
        if(response.data){
          $state.go('products');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }
  }]);
  // Products Controllers End
  // Policies Controllers Start
  app.controller('PoliciesCtl',['$scope','$modal','MenuFac','PoliciesServ','toastr',function($scope,$modal,MenuFac,PoliciesServ,toastr){
    MenuFac.active = 7;
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
  app.controller('NewPolicyCtl',['$scope','$state','MenuFac','PoliciesServ','toastr',function($scope,$state,MenuFac,PoliciesServ,toastr){
    MenuFac.active = 7;
    $scope.activePanel = MenuFac;
    $scope.newPolicyForm = {};
    $scope.newPolicy = function(){
      PoliciesServ.addPolicy($scope.newPolicyForm).then(function(response) {
        if(response.data){
          $state.go('policies');
          toastr.success('تمت إضافة سياسة جديدة بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditPolicyCtl',['$scope','$state','$stateParams','MenuFac','PoliciesServ','toastr',function($scope,$state,$stateParams,MenuFac,PoliciesServ,toastr){
    MenuFac.active = 7;
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
  // Policies Controllers End
  // Product Ploicies Controllers Start
  app.controller('ProductPoliciesCtl',['$scope','MenuFac','ProductPoliciesServ',function($scope,MenuFac,ProductPoliciesServ){
    MenuFac.active = 8;
    $scope.activePanel = MenuFac;
  
  }]);

  app.controller('ProductPoliciesServiceCtl',['$scope','$state','PoliciesServ','HelperServ','$stateParams','toastr','$modal','MenuFac','ProductPoliciesServ',function($scope,$state,PoliciesServ,HelperServ,$stateParams,toastr,$modal,MenuFac,ProductPoliciesServ){
    MenuFac.active = 8;
    $scope.activePanel = MenuFac;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.editPolicyServiceForm = {};
    $scope.objects = HelperServ;
    $scope.objects.getAllItems();
    $scope.objects.getAllServices();
    $scope.objects.getAllPackages();
    $scope.objects.getAllPolicies();
    ProductPoliciesServ.getProductPolicyByID($stateParams.id).then(function(response) {
      console.log(response.data);
      $scope.editPolicyServiceForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.editProductPolicy = function(){
      ProductPoliciesServ.editProductPolicy($stateParams.id,$scope.editPolicyServiceForm).then(function(response) {
        if(response.data){
          $state.go('productPoliciesService');
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }








    $scope.init = function () {
      ProductPoliciesServ.getProductPolicies($scope.pageSize,$scope.currentPage,{type:"service"}).then(function(response) {
        $scope.policies = response.data.result;
        console.log($scope.policies);
        $scope.total = response.data.count;
        console.log($scope.total);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init();

     $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذه سياسات منتج (الخدمة)";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ProductPoliciesServ.deleteProductPolicy(id).then(function(response) {
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

   app.controller('ProductPoliciesItemCtl',['$scope','$state','PoliciesServ','HelperServ','$stateParams','toastr','$modal','MenuFac','ProductPoliciesServ',function($scope,$state,PoliciesServ,HelperServ,$stateParams,toastr,$modal,MenuFac,ProductPoliciesServ){
       $scope.init = function () {
      ProductPoliciesServ.getProductPolicies($scope.pageSize,$scope.currentPage,{type:"item"}).then(function(response) {
        $scope.policies = response.data.result;
        console.log($scope.policies);
        $scope.total = response.data.count;
        console.log($scope.total);
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init();

     $scope.showDeleteModel = function(id){
      $scope.id = id;
      $scope.deleteName = "هذه سياسات منتج (المعدة)";
      $scope.deleteModel = $modal({
        scope: $scope,
        templateUrl: 'pages/model.delete.tpl.html',
        show: true
      });
    };
    $scope.confirmDelete = function(id){
      ProductPoliciesServ.deleteProductPolicy(id).then(function(response) {
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


  

  app.controller('NewProductPolicyCtl',['$scope','$state','MenuFac','ProductPoliciesServ','HelperServ','toastr',function($scope,$state,MenuFac,ProductPoliciesServ,HelperServ,toastr){
    MenuFac.active = 8;
    $scope.activePanel = MenuFac;
    $scope.activeTab = "tap1";
    $scope.objects = HelperServ;
    $scope.objects.getAllItems();
    $scope.objects.getAllServices();
    $scope.objects.getAllPackages();
    $scope.objects.getAllPolicies();
    $scope.newProductPolicyForm = {};
    $scope.newServiceProductPolicy = function(){
      $scope.newProductPolicyForm.type = "service";
      ProductPoliciesServ.addProductPolicy($scope.newProductPolicyForm).then(function(response){
        if(response.data){
          $state.go('productPoliciesService');
          toastr.success('تمت إضافة سياسة جديدة بنجاح');
        } else {
          console.log(response.data);
        }
      },function(response){
        console.log("Something went wrong");
      });
    };
    $scope.newItemProductPolicy = function(){
      $scope.newProductPolicyForm.type = "item";
      ProductPoliciesServ.addProductPolicy($scope.newProductPolicyForm).then(function(response){
        if(response.data){
          $state.go('productPoliciesItem');
          toastr.success('تمت إضافة سياسة جديدة بنجاح');
        } else {
          console.log(response.data);
        }
      },function(response){
        console.log("Something went wrong");
      });
    };
    $scope.newPackageProductPolicy = function(){
      $scope.newProductPolicyForm.type = "package";
      ProductPoliciesServ.addProductPolicy($scope.newProductPolicyForm).then(function(response){
        if(response.data){
          $state.go('productPolicies');
          toastr.success('تمت إضافة سياسة جديدة بنجاح');
        } else {
          console.log(response.data);
        }
      },function(response){
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('EditProductPolicyCtl',['$scope','MenuFac','ProductPoliciesServ',function($scope,MenuFac,ProductPoliciesServ){
    MenuFac.active = 8;
    $scope.activePanel = MenuFac;
  }]);
  // Product Policies Controllers End
  // Invoces Controllers Start
  app.controller('InvoicesCtl',['$scope','MenuFac','InvoicesServ',function($scope,MenuFac,InvoicesServ){
    MenuFac.active = 9;
    $scope.activePanel = MenuFac;
  }]);
  app.controller('NewInvoiceCtl',['$scope','$state','MenuFac','InvoicesServ','HelperServ','CustomersServ','toastr','$http','ReportServ',function($scope,$state,MenuFac,InvoicesServ,HelperServ,CustomersServ,toastr,$http,ReportServ){
   
    $scope.myFunc = function() {
      $scope.search=angular.element('#Text1').val();
      var name=angular.element('#Text1').val();
      console.log(name);
      if(!name){ name=null;};
      $http({ method: 'POST', url: '/customer/in/'+name}).
        success(function(data, status, headers, config) {
          $scope.customers=data;
        }).error(function(data, status, headers, config) {
          console.log('Oops and error', data);
        });
    };

    MenuFac.active = 9;
    $scope.activePanel = MenuFac;
    $scope.objects = HelperServ;
    $scope.objects.getAllItems();
    $scope.objects.getAllServices();
    $scope.objects.getAllPackages();
    $scope.newInvoiceForm = {};
    $scope.previousSubscription = '1';
    $scope.init = function () {
      CustomersServ.getAllCustomers().then(function(response) {
        $scope.customers = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });
    }
    $scope.init();
    $scope.newInvoice = function(){
      if($scope.previousSubscription==1){
        InvoicesServ.addInvoice($scope.newInvoiceForm).then(function(response,err){
          if(!err){
            console.log("dsds");
            window.location.href='/report/printInvoice';
          }
        },function(response){
          console.log("Something went wrong");
        });
      } else if($scope.previousSubscription==2){
          InvoicesServ.addInvoice($scope.newInvoiceForm).then(function(response){

          },function(response){
            console.log("Something went wrong");
          });
        }
    }
    $scope.print = ReportServ;
    $scope.print.invoiceObj = [{'id':'1','name':'aladdin'},{'id':'2','name':'Abdo'}];
    console.log($scope.print.invoiceObj);
  }]);
  app.controller('EditInvoiceCtl',['$scope','MenuFac','InvoicesServ',function($scope,MenuFac,InvoicesServ){
    MenuFac.active = 9;
    $scope.activePanel = MenuFac;
    $scope.editInvoiceForm = {};
  }]);
  // Invoces Controllers End
}())