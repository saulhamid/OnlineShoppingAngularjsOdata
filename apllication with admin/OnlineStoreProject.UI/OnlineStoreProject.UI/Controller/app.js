/// <reference path="../angular.js" />

// Apps

var app = angular.module('mainapp');


app.controller('customerCtrl', function ($scope, $http) {
    $scope.employees = [];
    $scope.current = null;
    $scope.isEdit = false;
    $scope.getHead = function () {
        return $scope.isEdit ? "Update" : "Add New";
    };
    var url = "http://localhost:2124/";
  
    //Get
    $http.get(url + "odata/Customers").success(function (data) {
        $scope.employees = data.value;
    }).error(function (response) { });

    //Insert
    $scope.insert = function () {
        var newEmp = angular.copy($scope.current);
        alert(JSON.stringify(newEmp));
        $http.post(url + "odata/Customers/", newEmp).success(function (data) {
            $scope.employees.push(data);
            $scope.current = null;
        }).error(function (response) {
        });
    };

    //Update
    $scope.update = function () {
        var newEmp = angular.copy($scope.current);
        $http.put(url + "odata/Customers(" + newEmp.Id + ")", newEmp).success(function (data) {
            $scope.isEdit = false;
            $scope.current = null;
        }).error(function (response) { });
    };

    //Delete
    $scope.delete = function (emp) {
        alert(emp.Id);
        if (confirm('Are you sure to delete...')) {
           
            $http.delete(url + "odata/Customers(" + emp.Id + ")")
                .success(function (data) {
                    $scope.employees.splice($scope.employees.indexOf(emp),1);
                })
            .error(function (response) { });
        }
    };

    $scope.edit = function (empl) {
        $scope.current = empl;
        $scope.isEdit = true;
    };



});

