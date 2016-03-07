


var app = angular.module('app', []);

app.controller('deliveryCtrl', function ($scope, $http) {
    $scope.deliveries = [];
    $scope.current = null;
    $scope.isEdit = false;
    $scope.getHead = function () {
        return $scope.isEdit ? "Update" : "Add New";

    };
    var url = "http://localhost:53145/";


    //Get
    $http.get(url + "OData/Deliveries/").success(function (data) {
        $scope.deliveries = data.value;
    }).error(function (response) { });




    $scope.insert = function () {
        var newDelivery = angular.copy($scope.current);
        var val = JSON.stringify(newDelivery);
        $http.post(url + "OData/Deliveries/", val).success(function (data) {
            $scope.deliveries.push(data);
            $scope.current = null;
        }).error(function (response) { });

    };

    //Update
    $scope.update = function () {
        var newDelivery = angular.copy($scope.current);
        $http.put(url + "OData/Deliveries(" + newDelivery.DId + ")", newDelivery).success(function (data) {
            $scope.isEdit = false;
            $scope.current = null;
        }).error(function (response) { });

    };



    //Delete
    $scope.delete = function (delvry) {

        if (confirm('Are you sure to delete!')) {
            $http.delete(url + "OData/Deliveries(" + delvry.DId + ")").success(function (data) {
                $scope.deliveries.splice($scope.deliveries.indexOf(delvry), 1);
            }).error(function (response) { });
        }


    };
    $scope.edit = function (delvry) {
        $scope.current = delvry;
        $scope.isEdit = true;
    };


});