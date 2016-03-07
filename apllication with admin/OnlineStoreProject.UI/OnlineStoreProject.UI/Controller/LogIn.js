angular.module("mainapp")
.controller("authCtrl", function ($scope, $http, $location, baseUrl, toastr) {
    $scope.customerInfo = [];
    $scope.error1;
    $scope.login = true || localStorage.getItem('CustomerName');
    $scope.logouts = false;
    $http.get(baseUrl+"/Customers").success(function (data) {
        $scope.customerInfo = data.value;
    });
    $scope.insert = function (current) {

        var newCustomer = angular.copy(current);
        var val = JSON.stringify(newCustomer);
        $http.post(baseUrl + "/Customers/", current).success(function (data) {

            $scope.customerInfo.push(data);
            $scope.current = null;
            toastr.success("Mr" + current+", Your Registration Successfull")
        }).error(function (response) { alert(response) });
    };
    $scope.authenticate = function (username, password) {
        $scope.error1 = null;
        for (i = 0; i < $scope.customerInfo.length; i++) {

            if (username == $scope.customerInfo[i].CustomerEmail && password == $scope.customerInfo[i].CustomerPassword) {
                localStorage.setItem('custid', $scope.customerInfo[i].CustomerID);
                localStorage.setItem('CustomerName', $scope.customerInfo[i].CustomerName);
                localStorage.setItem('username', username);
                localStorage.setItem('userpass', password);
                $location.path("/ordersubmit");
            }
            else {
                $scope.error3 = "Your Username or Password is not correct"
                $scope.error($scope.error3);
            }
        }
        $scope.login = false;
        //alert(localStorage.getItem('CustomerName'))
    };
    $scope.authenticatenav = function (username, password) {
        $scope.error1 = null;
        for (i = 0; i < $scope.customerInfo.length; i++) {

            if (username == $scope.customerInfo[i].CustomerEmail && password == $scope.customerInfo[i].CustomerPassword) {
                localStorage.setItem('custid', $scope.customerInfo[i].CustomerID);
                localStorage.setItem('CustomerName', $scope.customerInfo[i].CustomerName);
                localStorage.setItem('username', username);
                localStorage.setItem('userpass', password);
                toastr.info("Mr." + $scope.customerInfo[i].CustomerName + "Now Your are login");
                $location.path("/");
                $scope.login = false;
            }
            else {
                $scope.error3 = "Your Username or Password is not correct"
                $scope.error($scope.error3);
            }
        }
    }
    $scope.usernames = localStorage.getItem('username');
    $scope.userpass = localStorage.getItem('userpass');
    $scope.CustomerName = localStorage.getItem('CustomerName');

    $scope.logout = function () {

        $scope.login = true;
    
        localStorage.removeItem('username');
        localStorage.removeItem('CustomerName');
        toastr.warning("Now Your are Logout")
        $location.path("/");
    }
    $scope.forgetemail = function (email) {
       
        for (i = 0; i < $scope.customerInfo.length; i++) {
            if (email == $scope.customerInfo[i].CustomerEmail) {
                localStorage.setItem('custid', $scope.customerInfo[i].CustomerID);
                $scope.customerInfo = $scope.customerInfo[i];
                $location.path("/recovermail");
            }
            else {
                $scope.error = "Your Email don't not exit "
                
            }
        }
    }

    $scope.updatepassword = function (item) {
        $scope.CustomerID = localStorage.getItem('custid');
        alert($scope.CustomerID);
        for (i = 0; i < $scope.customerInfo.length; i++) {
            if ($scope.CustomerID == $scope.customerInfo[i].CustomerID) {
                $scope.customerInfo = $scope.customerInfo[i];
                $scope.customerInfo.CustomerPassword = item;
               
                $http.put(baseUrl + "/Customers(" + $scope.CustomerID + ")", $scope.customerInfo).success(function (data) {
                    $scope.loginstutes();
                  
                }).error(function (data) {
                
                    $scope.error = "Your Password Not accepted"
                   
                });
            }
        }
    };
    $scope.loginstutes = function () {
        if (localStorage.getItem('CustomerName') == null) {
            $location.path("/placeorder");
            toastr.info("Please Login or Create new account");
            toastr.warning("Account Your cannot order")
        }
        else {
            $location.path("/ordersubmit");
        }
    }
    $scope.error = function (error) {
        $scope.error1;
        if (error != null && $scope.error1 != error) {
            $scope.error1 = error;
            toastr.warning(error)
        }
    }
    
    return $scope.customerid;

   
});
