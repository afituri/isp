(function(){
  'use strict';
  var app = angular.module('isp');
  app.factory('MenuFac',function(){
    return {
      'active': -1
    }
  });
  app.factory('ReportServ',function(){
    return {
      'invoiceObj': []
    }
  });
  app.service('HelperServ',['$http','$rootScope',function($http,$rootScope){
    var self = {
      'stockObj': [],
      'citiesObj': [],
      'suppliersObj': [],
      'serviceProvidersObj': [],
      'itemsObj': [],
      'servicesObj': [],
      'packagesObj': [],
      'policiesObj': [],
      'warehouseObjs': [],
      'etcObj': [],
      'resellersObj': [],
      'notifications': {},
      'itemsRObj': [],
      'servicesRObj': [],
      'packagesRObj': [],
      'etcRObj': [],
      'getAllStock': function(){
        $http.get('/warehouse/all').then(function(response) {
          self.stockObj = response.data.result;
        }, function(response) {
          console.log("Something went wrong in getAllCities");
        });
      },
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
          console.log("Something went wrong in getAllServices");
        });
      },
      'getAllPackages': function(){
        return $http.get('/product/allPackage').then(function(response) {
          self.packagesObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllPackages");
        });
      },
      'getAllEtcs': function(){
        return $http.get('/product/new/one/allEtc').then(function(response) {
          self.etcObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllPackages");
        });
      },
      'getAllPolicies': function(){
        return $http.get('/policy/all').then(function(response) {
          self.policiesObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllPolicies");
        });
      },
      'getAllWarehouses': function(){
        return $http.get('/warehouse/allw').then(function(response) {
          self.warehouseObjs = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllItems");
        });
      },
      'getAllResellers': function(){
        return $http.get('/reseller/all').then(function(response) {
          self.resellersObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllResellers");
        });
      },
      'getAllItemsR': function(id){
        return $http.get('/product/allItemRA/'+id).then(function(response) {
          self.itemsRObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllItems");
        });
      },
      'getAllServicesR': function(id){
        return $http.get('/product/allServiceRA/'+id).then(function(response) {
          self.servicesRObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllServices");
        });
      },
      'getAllPackagesR': function(id){
        return $http.get('/product/allPackageRA/'+id).then(function(response) {
          self.packagesRObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllPackages");
        });
      },
      'getAllEtcsR': function(id){
        return $http.get('/product/allEtcRA/'+id).then(function(response) {
          self.etcRObj = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllPackages");
        });
      },
      'getNotification': function(){
        return $http.get('/invoice/Notification/').then(function(response) {
          self.notifications = response.data;
        }, function(response) {
          console.log("Something went wrong in getAllResellers");
        });
      }
    };
    self.getAllStock();
    self.getAllCities();
    self.getAllSuppliers();
    self.getAllServiceProviders();
    // self.watchNotification();
    return self;
  }]);

  app.service('DollarServ',['$http',function($http){
    var self = {
      'addDollar': function(dollar){
        return $http.post('/dollar/add',dollar);
      },
      'getDollar': function(pageSize,currentPage){
        return $http.get('/dollar/'+pageSize+'/'+currentPage)
      },
      'getLastDollar': function(){
        return $http.get('/dollar/lastDollar')
      },
      'deleteDollar': function(id){
        return $http.delete('/dollar/delete/'+id);
      }
    };
    return self;
   }]);

  app.service('PermissionServ',['$http',function($http){
    var self = {
      'addPermssion': function(permission){
        return $http.post('/permission',permission);
      },
      'getPermission': function(pageSize,currentPage){
        return $http.get('/permission/'+pageSize+'/'+currentPage);
      },
      'deletePermission': function(id){
        return $http.delete('/permission/'+id);
      },
      'getPermissionByID': function(id){
        return $http.get('/permission/'+id);
      },
      'editPermission': function(id,obj){
        return $http.put('/permission/'+id,obj);
      },
      'getAllPermission': function(){
        return $http.get('/permission');
      },
      'getSubpermission': function(){
        return $http.get('/permission/getSubPermission');
      }
    };
    return self;
  }]);

  app.service('UserServ',['$http',function($http){
    var self = {
      'getUserById': function(id){
        return $http.get('/user/'+id);
      },
      'getUser': function(pageSize,currentPage){
        return $http.get('/user/'+pageSize+'/'+currentPage);
      },
      'addUser': function(UserObj){
        return $http.post('/user/add',UserObj);
      },
      'editUser': function(id,UserObj){
        return $http.put('/user/edit/'+id,UserObj);
      },
      'deleteUser': function(id){
        return $http.delete('/user/delete/'+id);
      }
    };
    return self;
  }]);

  app.service('ResllersServ',['$http',function($http){
    var self = {
      'getResellers': function(pageSize,currentPage){
        return $http.get('/reseller/'+pageSize+'/'+currentPage);
      },
      'getResellersCount': function(pageSize,currentPage){
        return $http.get('/reseller/getAllResellersCount');
      },

      'getResellersByID': function(id){
        return $http.get('/reseller/'+id);
      },
      'addResller': function(resllerObj){
        return $http.post('/reseller/add',resllerObj);
      },
      'getResellerByName': function(name,pageSize,currentPage){
        console.log(name);
        return $http.post('/reseller/search/'+pageSize+'/'+currentPage,{name:name});
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
  app.service('ServiceProvidersServ',['$http','Upload',function($http,Upload){
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
        // return $http.post('/sProvider/add',serviceProviderObj);
        return Upload.upload({
          url: '/sProvider/add',
          method: 'POST',
          data: serviceProviderObj,
          file: serviceProviderObj.logo
        });
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
  app.service('uploadService',['$timeout','Upload',function($timeout,Upload){
    this.uploadFile = function(file, fieldName, insertedID) {
      var results = {errorFileType:false};
      if (file && (file.type === 'application/pdf') && (file.size <= 2000000)) {
        Upload.upload({
          url: 'api/fileUpload',
          method: 'POST',
          data: {file: file, 'fieldName': fieldName, 'insertedID': insertedID}
        }).then(function (response) {
          $timeout(function () {
            results.result = response.data;
            // console.log(results.result);
          });
        }, function (response) {
            if (response.status > 0){
              results.errorMsg = response.status + ': ' + response.data;
              // console.log(results.errorMsg);
            }
        }, function (evt) {
            results.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            // console.log(results.progress);
        });
      } else {
        results.errorFileType = true;
        // console.log(results.errorFileType);
      }
      return results;
    };
  }]);
//0000 
  app.service('ServicesServ',['$http',function($http){
    var self = {
      'getServices': function(pageSize,currentPage){
        return $http.get('/service/'+pageSize+'/'+currentPage);
      },
      'getServicesByName': function(name,pageSize,currentPage){
        console.log(name);
        return $http.post('/service/search/'+pageSize+'/'+currentPage,{name:name});
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
      },
      'getCustomerByService': function(id){
        return $http.get('/service/getCustomerByService/'+id);
      }
    };
    return self;
  }]);
  app.service('SuppliersServ',['$http',function($http){
    var self = {
      'getSuppliers': function(pageSize,currentPage){
        return $http.get('/supplier/'+pageSize+'/'+currentPage);
      },
      'getSuppliersByAll': function(all,pageSize,currentPage){
        return $http.get('/supplier/search/'+pageSize+'/'+currentPage+'/'+all);
      },
      'getSuppliersCount': function(pageSize,currentPage){
        return $http.get('/supplier/getSuppliersCount');
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
  app.service('InStockServ',['$http',function($http){
    var self = {
      'addInStock': function(obj){
        return $http.post('/inStock/add',obj);
      },
      'transfer': function(obj,to){
        return $http.post('/inStock/transfer',{obj:obj,to:to});
      },
      'getByWP': function(idStock,idItem){
        return $http.get('/inStock/getByWP/'+idStock+'/'+idItem);
      },
      'getByWare': function(idStock,pageSize,currentPage){
        return $http.get('/inStock/getByWare/'+idStock+'/'+pageSize+'/'+currentPage);
      },
      'getInStocks': function(pageSize,currentPage){
        return $http.get('/inStock/'+pageSize+'/'+currentPage);
      },
      'getInStocksSearch': function(stock,product,search,pageSize,currentPage){
        return $http.get('/inStock/searchinstock/'+stock+'/'+product+'/'+search+'/'+pageSize+'/'+currentPage);
      },
      'deleteStocks': function(id){
        return $http.delete('/inStock/delete/'+id);
      },
      'getInStockById': function(id){
        return $http.get('/inStock/'+id);
      },
      'editInStock': function(id,obj){
        return $http.put('/inStock/edit/'+id,obj);
      },
      'getInfoByMackAdress': function(mac){
        return $http.get('/inStock/searchMac/'+mac);
      },
      'getUserPassByWare': function(id){
        return $http.get('/inStock/getUserPassByWare/'+id);
      }
    };

    return self;

  }]);
  app.service('WarehousesServ',['$http',function($http){
    var self = {
      'getWarehouses': function(pageSize,currentPage){
        return $http.get('/warehouse/'+pageSize+'/'+currentPage);
      },
      'search': function(searchString,pageSize,currentPage){
        return $http.get('/warehouse/search/'+pageSize+'/'+currentPage+'/'+searchString);
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
      'getCustomerByAll' : function(all,pageSize,currentPage){
        return $http.get('/customer/searchAll/'+all+'/'+pageSize+'/'+currentPage);
      },
      'getCustomers': function(status,pageSize,currentPage){
        return $http.get('/customer/'+pageSize+'/'+currentPage+'/'+status);
      },
      'getCustomersRe': function(id,idC,pageSize,currentPage){
        return $http.get('/customer/getRe/'+pageSize+'/'+currentPage+'/'+id+'/'+idC);
      },
      'getAllMoney': function(){
        return $http.get('/report/company');
      },
      'getCustomersCount': function(){
        return $http.get('/customer/customerCount');
      },
      'getAllCustomers': function(){
        return $http.get('/customer/all');
      },
      'getAllCustomersStatus': function(){
        return $http.get('/customer/allStatus1');
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
      'editCustomerById': function(id){
        
        return $http.put('/customer/editById/'+id);
      },
      'editCustomerReject': function(id,customerObj){
        return $http.put('/customer/editRejectById/'+id,customerObj);
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
      'getProductsByName': function(name,pageSize,currentPage){
        return $http.get('/product/searchService/'+name+'/'+pageSize+'/'+currentPage);
      },
      'getProductServices': function(pageSize,currentPage){
        return $http.get('/product/service/'+pageSize+'/'+currentPage);
      },
      'getProductAll': function(pageSize,currentPage){
        return $http.get('/product/all');
      },
      'getAllService': function(){
        return $http.get('/product/allService');
      },
      'getAllEtc': function(){
        return $http.get('/product/allEtc');
      },
      'getAllItem': function(type){
        return $http.get('/product/allItem');
      },
      'getProductsPackagesByName': function(name,pageSize,currentPage){
        return $http.get('/product/searchPackages/'+name+'/'+pageSize+'/'+currentPage);
      },
      'getAllPackage': function(type){
        return $http.get('/product/allPackage');
      },
      'getProductItems': function(pageSize,currentPage){
        return $http.get('/product/item/'+pageSize+'/'+currentPage);
      },
      'getProductsItemsByName': function(name,pageSize,currentPage){
        return $http.get('/product/searchItems/'+name+'/'+pageSize+'/'+currentPage);
      },
      'getProductPackages': function(pageSize,currentPage){
        return $http.get('/product/package/'+pageSize+'/'+currentPage);
      },
      'getProductPackagesSearch': function(pageSize,currentPage,service){
        return $http.get('/product/packageSearch/'+pageSize+'/'+currentPage+'/'+service);
      },
      'getProductPackagesByService': function(service){

        return $http.get('/product/getPackagesByService/service/'+service);
      },
      'getProductPackagesByServiceR': function(reseller,service){
        return $http.get('/product/getPackagesByService/serviceR/'+service+'/'+reseller);
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
      },
      'getProductOtherEquipments': function(pageSize,currentPage){
        return $http.get('/product/otherEquipment/'+pageSize+'/'+currentPage);
      },
      'getProductOtherEquipmentByID': function(id){
        return $http.get('/product/'+id);
      },
      'editProductOtherEquipment':function(id,otherEquipmentObj){
        return $http.put('/product/productEtc/edit/'+id,otherEquipmentObj);
      },
      'deleteProductOtherEquipment': function(id){
        return $http.delete('/product/productOtherEquipment/delete/'+id);
      },
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
      },
      'searchPolicy': function(name){
        console.log(name);
        //return $http.get('//');

      }
    };
    return self;
  }]);
  app.service('ProductPoliciesServ',['$http',function($http){
    var self = {
      'getProductPolicies': function(pageSize,currentPage,type){
        return $http.post('/policy/productPolicy/'+pageSize+'/'+currentPage,type);
      },
      'getProductPolicyByID': function(id){
        return $http.post('/policy/productPolicyService/'+id);
      },
      'addProductPolicy': function(productPolicyObj){
        return $http.post('/policy/productPolicy/add',productPolicyObj);
      },
      'editProductPolicy': function(id,productPolicyObj){
        return $http.put('/policy/productPolicy/edit/'+id,productPolicyObj);
      },
      'deleteProductPolicy': function(id){
        return $http.delete('/policy/productPolicy/delete/'+id);
      }
    };
    return self;
  }]);
  app.service('CSVServ',['$http',function($http){
     var self = {
      'addCSVFile': function(CSVObj){
        return $http.post('/report/restor',CSVObj);
      }
    };
    return self;
  }]);

  app.service('gigaServ',['$http',function($http){
     var self = {
      'addgiga': function(form){
        return $http.post('/invoice/addgiga',form);
      }
    };
    return self;
  }]);

  app.service('InvoicesServ',['$http','Upload',function($http,Upload){
    var self = {
      'searchForMac': function(all,pageSize,currentPage){
        return $http.get('/invoice/searchAll/'+pageSize+'/'+currentPage+'/'+all);
      },
      'searchForProduct': function(id){
        return $http.get('/invoice/searchForProduct/all/'+id);
      },
      'getInvoces': function(pageSize,currentPage){
        return $http.get('/invoice/'+pageSize+'/'+currentPage);
      },
      'getTotal': function(id){
        return $http.get('/report/money/'+id);
      },
      'getInvoicePending': function(status,pageSize,currentPage){
        return $http.get('/invoice/InvoicePending/'+pageSize+'/'+currentPage+'/'+status);
      },
      'getInvoiceByID': function(status,id){
        return $http.get('/invoice/invoices/'+id+'/'+status);
      },
      'getInvoicedata': function(id){
        return $http.get('/invoice/invoicesdata/'+id);
      },
      'getNotification': function(){
        return $http.get('/invoice/Notification/');
      },
      'addInvoice': function(invoiceObj){
        return $http.post('/invoice/add',invoiceObj);
      },
      'report': function(invoiceObj){
        return $http.post('/report/printInvoice',invoiceObj);
      },
      'active': function(invoiceObj){
        return $http.post('/report/active',{service:invoiceObj});
      },
      'activeReport': function(){
        return $http.get('/report/printActive');
      },
      'unActive': function(invoiceObj){
        return $http.post('/report/unactive',{service:invoiceObj});
      },
      'contractBetweenDates': function(start,end,service){
        return $http.post('/report/Between',{start:start,end:end,service:service});
      },
      'Byresseler': function(id){
        return $http.post('/report/Reseller',{reseller:id});
      },
      'printBetweenDates': function(start,end){
      },
      'printResseler': function(id){
        return $http.post('/report/printReseller',{reseller:id});
      },
      'editInvoice': function(id,invoiceObj){
        return $http.put('/invoice/edit/'+id,invoiceObj);
      },
      'deleteInvoice': function(id){
        return $http.delete('/invoice/delete/'+id);
      },
      'getItemInfoByID': function(id){
        return $http.get('/inStock/search/'+id);
      },
      'renewInvice': function(renewInviceObj){
        return $http.post('/invoice/renewInvice',renewInviceObj);
      },
      'upgreadInvice': function(renewInviceObj){
        return $http.post('/invoice/upInvice',renewInviceObj);
      },
      'replacInvice': function(replacInviceObj){
        return $http.post('/invoice/replacInvice',replacInviceObj);
      },
      'paidInvoice': function(paidInviceObj){
        // return $http.post('/invoice/paidInvoice',paidInviceObj);
        return Upload.upload({
          url: '/invoice/paidInvoice',
          method: 'POST',
          data: paidInviceObj,
          file: paidInviceObj.image
        });
      }
    };
    return self;
  }]);
}());