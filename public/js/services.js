(function(){
  'use strict';
  var app = angular.module('isp');
  app.factory('MenuFac',function(){
    return {
      'active': -1
    }
  });
  app.service('ReportServ',['$http',function($http){
    var self = {
      'invoiceObj': []
    };
    return self;
  }]);
  app.service('HelperServ',['$http',function($http){
    var self = {
      'citiesObj': [],
      'suppliersObj': [],
      'serviceProvidersObj': [],
      'itemsObj': [],
      'servicesObj': [],
      'packagesObj': [],
      'policiesObj': [],
      'getAllCities': function(){
        $http.get('/cities').then(function(response) {
          self.citiesObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllCities");
        });
      },
      'getAllSuppliers': function(){
        return $http.get('/supplier/all').then(function(response) {
          self.suppliersObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllSuppliers");
        });
      },
      'getServiceProvidersServicesByID': function(id){
        return $http.get('/sProvider/'+id+'/services');
      },
      'getAllServiceProviders': function(){
        return $http.get('/sProvider/').then(function(response) {
          self.serviceProvidersObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllServiceProviders");
        });
      },
      'getAllItems': function(){
        return $http.get('/product/allItem').then(function(response) {
          self.itemsObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllItems");
        });
      },
      'getAllServices': function(){
        return $http.get('/product/allService').then(function(response) {
          self.servicesObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllItems");
        });
      },
      'getAllPackages': function(){
        return $http.get('/product/allPackage').then(function(response) {
          self.packagesObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllItems");
        });
      },
      'getAllPolicies': function(){
        return $http.get('/policy/all').then(function(response) {
          self.policiesObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllItems");
        });
      }
    };
    self.getAllCities();
    self.getAllSuppliers();
    self.getAllServiceProviders();
    return self;
  }]);
  app.service('ResllersServ',['$http',function($http){
    var self = {
      'getResellers': function(pageSize,currentPage){
        return $http.get('/reseller/'+pageSize+'/'+currentPage);
      },
      'getResellersByID': function(id){
        return $http.get('/reseller/'+id);
      },
      'addResller': function(resllerObj){
        return $http.post('/reseller/add',resllerObj);
      },
      'editResller': function(id,resllerObj){
        return $http.put('/reseller/edit/'+id,resllerObj);
      },
      'deleteResller': function(id){
        return $http.delete('/reseller/delete/'+id);
      }
    };
    return self;
  }]);
  app.service('ServiceProvidersServ',['$http',function($http){
    var self = {
      'serviceProvidersObj': [],
      'getServiceProviders': function(){
        $http.get('/sProvider').then(function(response) {
          self.serviceProvidersObj = response.data;
        }, function(response) {
          console.log("Something went wrong");
        });
      },
      'getServiceProviderByID': function(id){
        return $http.get('/sProvider/'+id);
      },
      'getServiceProvidersServicesByID': function(id){
        return $http.get('/sProvider/'+id+'/services');
      },
      'addServiceProvider': function(serviceProviderObj){
        return $http.post('/sProvider/add',serviceProviderObj);
      },
      'editServiceProvider': function(id,serviceProviderObj){
        return $http.put('/sProvider/edit/'+id,serviceProviderObj);
      },
      'deleteServiceProvider': function(id){
        return $http.delete('/sProvider/delete/'+id);
      }
    };
    self.getServiceProviders();
    return self;
  }]);
//0000 
  app.service('ServicesServ',['$http',function($http){
    var self = {
      'getServices': function(pageSize,currentPage){
        return $http.get('/service/'+pageSize+'/'+currentPage);
      },
      'getAllServices': function(pageSize,currentPage){
        return $http.get('/service/all');
      },
      'getServiceByID': function(id){
        return $http.get('/service/'+id);
      },
      'addService': function(serviceObj){
        return $http.post('/service/add',serviceObj);
      },
      'editService': function(id,serviceObj){
        return $http.put('/service/edit/'+id,serviceObj);
      },
      'deleteService': function(id){
        return $http.delete('/service/delete/'+id);
      }
    };
    return self;
  }]);
  app.service('SuppliersServ',['$http',function($http){
    var self = {
      'getSuppliers': function(pageSize,currentPage){
        return $http.get('/supplier/'+pageSize+'/'+currentPage);
      },
      'getSupplierByID': function(id){
        return $http.get('/supplier/'+id);
      },
      'addSupplier': function(supplierObj){
        return $http.post('/supplier/add',supplierObj);
      },
      'editSupplier': function(id,supplierObj){
        return $http.put('/supplier/edit/'+id,supplierObj);
      },
      'deleteSupplier': function(id){
        return $http.delete('/supplier/delete/'+id);
      }
    };
    return self;
  }]);
  app.service('WarehousesServ',['$http',function($http){
    var self = {
      'getWarehouses': function(pageSize,currentPage){
        return $http.get('/warehouse/'+pageSize+'/'+currentPage);
      },
      'getWarehouseByID': function(id){
        return $http.get('/warehouse/'+id);
      },
      'addWarehouse': function(warehouseObj){
        return $http.post('/warehouse/add',warehouseObj);
      },
      'editWarehouse': function(id,warehouseObj){
        return $http.put('/warehouse/edit/'+id,warehouseObj);
      },
      'deleteWarehouse': function(id){
        return $http.delete('/warehouse/delete/'+id);
      }
    };
    return self;
  }]);
  app.service('CustomersServ',['$http',function($http){
    var self = {
      'getCustomers': function(pageSize,currentPage){
        return $http.get('/customer/'+pageSize+'/'+currentPage);
      },
      'getAllCustomers': function(){
        return $http.get('/customer/all');
      },
      'getCustomerByID': function(id){
        return $http.get('/customer/'+id);
      },
      'addCustomer': function(customerObj){
        return $http.post('/customer/add',customerObj);
      },
      'editCustomer': function(id,customerObj){
        return $http.put('/customer/edit/'+id,customerObj);
      },
      'deleteCustomer': function(id){
        return $http.delete('/customer/delete/'+id);
      }
    };
    return self;
  }]);

 /* app.service('ProductsItem',['$http',function($http){
     var self = {
      'getProductServices': function(pageSize,currentPage){
        return $http.get('/product/service/'+pageSize+'/'+currentPage);
      },
      'getProductItems': function(pageSize,currentPage){
        return $http.get('/product/item/'+pageSize+'/'+currentPage);
      },
      'getProductPackages': function(pageSize,currentPage){
        return $http.get('/product/package/'+pageSize+'/'+currentPage);
      },
      'getProductByID': function(id){
        return $http.get('/product/'+id);
      },
      'addProduct': function(productObj){
        return $http.post('/product/add',productObj);
      },
      'editProduct': function(id,productObj){
        return $http.put('/product/edit/'+id,productObj);
      },
      'getProductServiceByID':function(id,serviceObj){
        return $http.put('/product/productService/'+id,serviceObj);
      },
      'editProductService':function(id,productObj){
        return $http.put('/product/productService/edit/'+id,productObj);
      },
      'deleteProductService': function(id){
        return $http.delete('/product/productService/delete/'+id);
      },
      'deleteProduct': function(id){
        return $http.delete('/product/delete/'+id);
      }
    };
    return self;
   }]);*/


  app.service('ProductsServ',['$http',function($http){
    var self = {
      'getProductServices': function(pageSize,currentPage){
        return $http.get('/product/service/'+pageSize+'/'+currentPage);
      },
      'getProductItems': function(pageSize,currentPage){
        return $http.get('/product/item/'+pageSize+'/'+currentPage);
      },
      'getProductPackages': function(pageSize,currentPage){
        return $http.get('/product/package/'+pageSize+'/'+currentPage);
      },
      'getProductByID': function(id){
        return $http.get('/product/'+id);
      },
      'addProduct': function(productObj){
        return $http.post('/product/add',productObj);
      },
      'editProduct': function(id,productObj){
        return $http.put('/product/edit/'+id,productObj);
      },
      'getProductServiceByID':function(id,serviceObj){
        return $http.put('/product/productService/'+id,serviceObj);
      },
      'editProductService':function(id,productObj){
        return $http.put('/product/productService/edit/'+id,productObj);
      },
      'editProductItem':function(id,productObj){
        return $http.put('/product/productItems/edit/'+id,productObj);
      },
      'editProductPackage':function(id,productObj){
        return $http.put('/product/productPackages/edit/'+id,productObj);
      },
      'deleteProductService': function(id){
        return $http.delete('/product/productService/delete/'+id);
      },
      'deleteProduct': function(id){
        return $http.delete('/product/delete/'+id);
      }
    };
    return self;
  }]);

  
  app.service('PoliciesServ',['$http',function($http){
    var self = {
      'getPolicies': function(pageSize,currentPage){
        return $http.get('/policy/'+pageSize+'/'+currentPage);
      },
      'getPolicyByID': function(id){
        return $http.get('/policy/'+id);
      },
      'addPolicy': function(policyObj){
        return $http.post('/policy/add',policyObj);
      },
      'editPolicy': function(id,policyObj){
        return $http.put('/policy/edit/'+id,policyObj);
      },
      'deletePolicy': function(id){
        return $http.delete('/policy/delete/'+id);
      }
    };
    return self;
  }]);
  app.service('ProductPoliciesServ',['$http',function($http){
    var self = {
      'getProductPolicies': function(pageSize,currentPage){
        return $http.get('/productPolicy/'+pageSize+'/'+currentPage);
      },
      'getProductPolicyByID': function(id){
        return $http.get('/productPolicy/'+id);
      },
      'addProductPolicy': function(productPolicyObj){
        return $http.post('/policy/productPolicy/add',productPolicyObj);
      },
      'editProductPolicy': function(id,productPolicyObj){
        return $http.put('/productPolicy/edit/'+id,productPolicyObj);
      },
      'deleteProductPolicy': function(id){
        return $http.delete('/productPolicy/delete/'+id);
      }
    };
    return self;
  }]);
  app.service('InvoicesServ',['$http',function($http){
    var self = {
      'getInvoces': function(pageSize,currentPage){
        return $http.get('/invoice/'+pageSize+'/'+currentPage);
      },
      'getInvoiceByID': function(id){
        return $http.get('/invoice/'+id);
      },
      'addInvoice': function(invoiceObj){
        return $http.post('/invoice/add',invoiceObj);
      },
      'editInvoice': function(id,invoiceObj){
        return $http.put('/invoice/edit/'+id,invoiceObj);
      },
      'deleteInvoice': function(id){
        return $http.delete('/invoice/delete/'+id);
      }
    };
    return self;
  }]);
}());