angular.module('mainapp')
.controller('customerCtrl', function ($scope, $http,$location, baseUrl, toastr) {
    $scope.customers = [];
    $scope.current = false;
    $scope.CustomerOrders = {};
    $scope.CustomerDetail = {};
    //Insert
    var customerid =localStorage.getItem('custid');

    $http.get(baseUrl + "/Customers/?$filter=CustomerID%20eq%20" + customerid).success(function (data) {
        $scope.CustomerDetail = data.value;
    }).error(function (data) {
        toastr.error('Error From Server',+data);
    })
    $http.get(baseUrl + "/OrderDetails?$expand=Customers%28$filter=CustomerID%20eq%20 " + customerid + ")").success(function (data) {
        $scope.CustomerOrders = data.value;
    }).error(function (data) {
        toastr.error('Error From Server', +data);
    })
    $scope.Update = function (item) {
        $http.put(baseUrl + "/Customers(" + item.CustomerID + ")", item).success(function (data) {
            toastr.info('Mr' + item.CustomerName+"Your Account has been Updated");
        }).error(function (data) {
            toastr.warning('Mr' + item.CustomerName+"your are not update",+data)
        })
    }
    $scope.countryList = [
   { CountryId: 1, Name: 'India' },
   { CountryId: 2, Name: 'USA' }
    ];

    $scope.cityList = [];

    $scope.$watch('current.CustomerCountry', function (newVal, oldVal) {

        if (newVal == 1)
            $scope.cityList = [
            { CountryId: 1, CityId: 1, Name: 'Noida' },
            { CountryId: 1, CityId: 2, Name: 'Delhi' }];
        else if (newVal == 2)
            $scope.cityList = [
            { CountryId: 2, CityId: 3, Name: 'Texas' },
            { CountryId: 2, CityId: 4, Name: 'NewYork' }];
        else
            $scope.cityList = [];
    });

    // function to submit the form after all validation has occurred 
    $scope.submitForm = function () {

        // Set the 'submitted' flag to true
        $scope.submitted = true;

        if ($scope.userForm.$valid) {
            toastr.warning("Form is valid!")
        }
        else {
            toastr.error("Please correct errors!")
        }
    };
    $scope.insert = function (current) {
        for (var i = 0; i < $scope.countryList.length; i++) {
            if (current.CustomerCountry == $scope.countryList[i].CountryId) {
                current.CustomerCountry = $scope.countryList[i].Name
                break;
            }
        }
        for (var i = 0; i < $scope.cityList.length; i++) {
            if (current.CustomerCity == $scope.cityList[i].CityId) {
                current.CustomerCity = $scope.cityList[i].Name
                break;
            }
        }
        alert(JSON.stringify(current))

        var newCustomer = angular.copy(current);
        var val = JSON.stringify(newCustomer);
        $http.post(baseUrl + "/Customers/", current).success(function (data) {

            $scope.customerInfo.push(data);
            $scope.current = null;
            $location.path("/placeorder");
            toastr.success("Mr." + current.CustomerName+"Your Registration Succssfull")
        }).error(function (response) { $scope.current.error= response.error || response });
    };
    
}).directive('ngCompare', function () {
    return {
        require: 'ngModel',
        link: function (scope, currentEl, attrs, ctrl) {
            var comparefield = document.getElementsByName(attrs.ngCompare)[0]; //getting first element
            compareEl = angular.element(comparefield);

            //current field key up
            currentEl.on('keyup', function () {
                if (compareEl.val() != "") {
                    var isMatch = currentEl.val() === compareEl.val();
                    ctrl.$setValidity('compare', isMatch);
                    scope.$digest();
                }
            });
            //Element to compare field key up
            compareEl.on('keyup', function () {
                if (currentEl.val() != "") {
                    var isMatch = currentEl.val() === compareEl.val();
                    ctrl.$setValidity('compare', isMatch);
                    scope.$digest();
                }
            });
        }
    }
}).directive('uniqueEmail', function($http) {
  var toId;
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attr, ctrl) { 
      //when the scope changes, check the email.
      scope.$watch(attr.ngModel, function(value) {
        // if there was a previous attempt, stop it.
        if(toId) clearTimeout(toId);
          alert(value)
        // start a new attempt with a delay to keep it from
        // getting too "chatty".
        toId = setTimeout(function(){
          // call to some API that returns { isValid: true } or { isValid: false }
            $http.get(baseUrl + "/Customers("+value+")").success(function (data) {

              //set the validity of the field
              ctrl.$setValidity('uniqueEmail', data.isValid);
          });
        }, 200);
      })
    }
  }
});