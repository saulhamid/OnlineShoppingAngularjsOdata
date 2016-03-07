
angular.module('AdminApp',[])
.controller('SuplaierCtrlAdmin', function ($scope, $http) {
    $scope.Suplaiertlist = [];
    $scope.current = null;
    $scope.isEdit = false;
    $scope.getHead = function () {
        return $scope.isEdit ? "Update" : "Add New";

    };
   
    $http.get('http://localhost:2124/odata/Supplaiers').success(function (data) {
        $scope.Suplaiertlist = data.value;

    }).error(function (data) {
    });
    $scope.insert = function () {
        var newSup = angular.copy($scope.current);
        var val = JSON.stringify(newSup);
        $http.post("http://localhost:2124/odata/Supplaiers", val).success(function (data) {
            $scope.Suplaiertlist.push(data);
            $scope.current = null;
        }).error(function (response) {
        });
    };

    $scope.update = function () {
        var newSupplaier = angular.copy($scope.current);
        $http.put("http://localhost:2124/odata/Supplaiers(" + newSupplaier.SupID + ")", newSupplaier).success(function (data) {
            $scope.isEdit = false;
            $scope.current = null;
        }).error(function (response) { });

    };
    $scope.delete = function (sup) {

        if (confirm('Are you sure to delete!')) {
            $http.delete("http://localhost:2124/odata/Supplaiers(" + sup.SupID + ")").success(function (data) {
                $scope.Suplaiertlist.splice($scope.Suplaiertlist.indexOf(sup), 1);
            }).error(function (response) { });
        }


    };
    $scope.edit = function (sup) {
        $scope.current = sup;
        $scope.isEdit = true;
    };
})

