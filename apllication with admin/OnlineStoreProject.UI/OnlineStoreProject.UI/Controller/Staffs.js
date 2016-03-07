



var app = angular.module('app', []);

app.controller('staffCtrl', function ($scope, $http) {
    $scope.staffs = [];
    $scope.current = null;
    $scope.isEdit = false;
    $scope.getHead = function () {
        return $scope.isEdit ? "Update" : "Add New";

    };
    var url = "http://localhost:53145/";


    //Get
    $http.get(url + "OData/Staffs/").success(function (data) {
        $scope.staffs = data.value;
    }).error(function (response) { });


    //$scope.insert = function () {
    //    var newStaff = angular.copy($scope.current);
    //    var val = JSON.stringify(newStaff);
    //    $http.post(url + "OData/Staffs/", val).success(function (data) {
    //        $scope.staffs.push(data);
    //        $scope.current = null;
    //    }).error(function (response) { });

    //};

    $scope.insert = function () {
        var newStaff = angular.copy($scope.current);
        var val = JSON.stringify(newStaff);
        $http.post(url + "OData/Staffs/", val).success(function (data) {
            $scope.staffs.push(data);
            $scope.current = null;
        }).error(function (response) { });

    };

    //Update
    $scope.update = function () {
        var newStaff = angular.copy($scope.current);
        $http.put(url + "OData/Staffs(" + newStaff.SId + ")", newStaff).success(function (data) {
            $scope.isEdit = false;
            $scope.current = null;
        }).error(function (response) { });

    };



    //Delete
    $scope.delete = function (staf) {
     
        if (confirm('Are you sure to delete!')) {
            $http.delete(url + "OData/Staffs(" + staf.SId + ")").success(function (data) {
                $scope.staffs.splice($scope.staffs.indexOf(staf), 1);
            }).error(function (response) { });
        }


    };
    $scope.edit = function (prod) {
        $scope.current = prod;
        $scope.isEdit = true;
    };


});