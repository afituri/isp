// Route State Load Spinner(used on page or content load)
angular.module('isp').directive('ngSpinnerBar', ['$rootScope',
  function($rootScope) {
    return {
      link: function(scope, element, attrs) {
        // by defult hide the spinner bar
        element.addClass('hide'); // hide spinner bar by default
        // display the spinner bar whenever the route changes(the content part started loading)
        $rootScope.$on('$stateChangeStart', function() {
          element.removeClass('hide'); // show spinner bar
        });
        // hide the spinner bar on rounte change success(after the content loaded)
        $rootScope.$on('$stateChangeSuccess', function() {
          element.addClass('hide'); // hide spinner bar
          $('body').removeClass('page-on-load'); // remove page loading indicator
          Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu
          // auto scorll to page top
          setTimeout(function () {
              App.scrollTop(); // scroll to the top on content load
          }, $rootScope.settings.layout.pageAutoScrollOnLoad);     
        });
        // handle errors
        $rootScope.$on('$stateNotFound', function() {
            element.addClass('hide'); // hide spinner bar
        });
        // handle errors
        $rootScope.$on('$stateChangeError', function() {
            element.addClass('hide'); // hide spinner bar
        });
      }
    };
  }
]);
// Handle global LINK click
angular.module('isp').directive('a', function() {
  return {
    restrict: 'E',
    link: function(scope, elem, attrs) {
      if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
        elem.on('click', function(e) {
          e.preventDefault(); // prevent link click for above criteria
        });
      }
    }
  };
});
// Handle Dropdown Hover Plugin Integration
angular.module('isp').directive('dropdownMenuHover', function () {
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };  
});
angular.module('isp').directive("matchVerify", function() {
  return {
    require: "ngModel",
    scope: {
      matchVerify: '='
    },
    link: function(scope, element, attrs, ctrl) {
      scope.$watch(function() {
        var combined;
        if (scope.matchVerify || ctrl.$viewValue) {
          combined = scope.matchVerify + '_' + ctrl.$viewValue; 
        }                    
        return combined;
      }, function(value) {
        if (value) {
          ctrl.$parsers.unshift(function(viewValue) {
            var origin = scope.matchVerify;
            if (origin !== viewValue) {
              ctrl.$setValidity("matchVerify", false);
              return undefined;
            } else {
              ctrl.$setValidity("matchVerify", true);
              return viewValue;
            }
          });
        }
      });
    }
  };
});