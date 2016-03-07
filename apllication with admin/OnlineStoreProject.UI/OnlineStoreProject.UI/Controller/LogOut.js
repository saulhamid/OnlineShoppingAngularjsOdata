angular.module("mainapp")
.controller("authCtrl", function ($scope, $http, $location, $rootScope) {
    $scope.username = localStorage.getItem('username');
    $scope.userpass = localStorage.getItem('userpass');
    $scope.logout = function () {
        alert('done')
        localStorage.removeItem('username');
                $location.path("/");

            }
});
