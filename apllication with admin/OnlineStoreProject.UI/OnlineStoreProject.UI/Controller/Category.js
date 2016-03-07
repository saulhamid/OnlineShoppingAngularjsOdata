

var app = angular.module('app', []);


app.controller('categoryCtrl', function ($scope, $http) {
    $scope.categories = [];

    $scope.current = null;
    $scope.isEdit = false;
    $scope.getHead = function () {
        return $scope.isEdit ? "Update" : "Add New";
    };
    //var url = "http://localhost:53145/";


    //Get
    $http.get("http://saulhamid02-001-site1.ctempurl.com/odata/ProductCategories").success(function (data) {
        $scope.categories = data.value;
    }).error(function (response) { });

    //Insert
    //$scope.insert = function () {
    //    var newCategory = angular.copy($scope.current);

    //    var val=JSON.stringify(newCategory);
    //    $http.post(url + "OData/Categories/", val).success(function (data) {
    //        $scope.categories.push(data);
    //        $scope.current = null;
    //    }).error(function (response) {
    //    });
    //};

    $scope.insert = function () {
        var newCustomer = angular.copy($scope.current);
        var val = JSON.stringify(newCustomer);
        $http.post(url + "OData/Categories/", val).success(function (data) {
            $scope.customers.push(data);
            $scope.current = null;
        }).error(function (response) { });

    };

    //Update
    $scope.update = function () {
        var newCategory = angular.copy($scope.current);
        $http.put(url + "OData/Categories(" + newCategory.CatId + ")", newCategory).success(function (data) {
            $scope.isEdit = false;
            $scope.current = null;
        }).error(function (response) { });
    };

    //Delete
    $scope.delete = function (category) {
        
        if (confirm('Are you sure to delete...')) {

            $http.delete(url + "OData/Categories(" + category.CatId + ")").success(function (data) {
                $scope.categories.splice($scope.categories.indexOf(category), 1);
            })
            .error(function (response) { });
        }
    };

    $scope.edit = function (category) {
        $scope.current = category;
        $scope.isEdit = true;
    };



});

