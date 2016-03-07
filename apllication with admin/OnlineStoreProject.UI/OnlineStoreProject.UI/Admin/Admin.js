
angular.module("mainapp")
.controller('productCtrlAdmin', function ($scope, $http, baseUrl) {
    $scope.totalProduct = 0;
    $scope.productlist = [];
    $scope.current = null;
    $scope.isEdit = false;
    $scope.getHead = function () {
        return $scope.isEdit ? "Update" : "Add New";

    };
    
    $http.get(baseUrl+'/Products').success(function (data) {
        $scope.productlist = data.value;

        for (var i = 0; i < $scope.productlist.length; i++) {
            $scope.totalProduct += Number($scope.productlist[i].ProductQty)

        }
    }).error(function (data) {
    });
    $scope.insert = function () {
        var newEmp = angular.copy($scope.current);
        var val = JSON.stringify(newEmp);
        $http.post(baseUrl + "/Products", val).success(function (data) {
            $scope.productlist.push(data);
            $scope.current = null;
        }).error(function (response) {
          
        });
    };

    $scope.update = function () {
        var newProduct = angular.copy($scope.current);
        $http.put(baseUrl + "/Products(" + newProduct.ProductID + ")", newProduct).success(function (data) {
            $scope.isEdit = false;
            $scope.current = null;
        }).error(function (response) { });

    };
    $scope.delete = function (prod) {

        if (confirm('Are you sure to delete!')) {
            $http.delete(baseUrl + "/Products(" + prod.ProductID + ")").success(function (data) {
                $scope.productlist.splice($scope.productlist.indexOf(prod), 1);
            }).error(function (response) { });
        }


    };
    $scope.edit = function (prod) {
        $scope.current = prod;
        $scope.isEdit = true;
    };

    $http.get(baseUrl + '/ProductCategories').success(function (data) {
        $scope.productCategory = data.value;
    }).error(function (data) {
        alert(data)
    });
    $http.get(baseUrl + "/Supplaiers").success(function (data) {
        $scope.suppliers = data.value;
    }).error(function (response) { });
})
.controller('SuplaierCtrlAdmin', function ($scope, $http, baseUrl) {
    $scope.Suplaiertlist = [];
    $scope.current = null;
    $scope.isEdit = false;
    $scope.getHead = function () {
        return $scope.isEdit ? "Update" : "Add New";

    };

    $http.get(baseUrl + '/Supplaiers').success(function (data) {
        $scope.Suplaiertlist = data.value;

    }).error(function (data) {
    });
    $scope.insert = function () {
        var newSup = angular.copy($scope.current);
        var val = JSON.stringify(newSup);
        $http.post(baseUrl + "/Supplaiers", val).success(function (data) {
            $scope.Suplaiertlist.push(data);
            $scope.current = null;
        }).error(function (response) {
        });
    };

    $scope.update = function () {
        var newSupplaier = angular.copy($scope.current);
        $http.put(baseUrl + "/Supplaiers(" + newSupplaier.SupID + ")", newSupplaier).success(function (data) {
            $scope.isEdit = false;
            $scope.current = null;
        }).error(function (response) { });

    };
    $scope.delete = function (sup) {

        if (confirm('Are you sure to delete!')) {
            $http.delete(baseUrl + "/Supplaiers(" + sup.SupID + ")").success(function (data) {
                $scope.Suplaiertlist.splice($scope.Suplaiertlist.indexOf(sup), 1);
            }).error(function (response) { });
        }


    };
    $scope.edit = function (sup) {
        $scope.current = sup;
        $scope.isEdit = true;
    };
}).controller('ProductCategoriAdmin', function ($scope, $http, baseUrl) {
    $scope.Categorylist = [];
    $scope.current = null;
    $scope.isEdit = false;
    $scope.getHead = function () {
        return $scope.isEdit ? "Update" : "Add New";

    };

    $http.get(baseUrl + '/ProductCategories').success(function (data) {
        $scope.Categorylist = data.value;

    }).error(function (data) {
    });
    $scope.insert = function () {
        var newCat = angular.copy($scope.current);
        var val = JSON.stringify(newCat);
        $http.post(baseUrl + "/ProductCategories", val).success(function (data) {
            $scope.Categorylist.push(data);
            $scope.current = null;
        }).error(function (response) {
        });
    };

    $scope.update = function () {
        var newCategory = angular.copy($scope.current);
        $http.put(baseUrl + "/ProductCategories(" + newCategory.CategoryID + ")", newCategory).success(function (data) {
            $scope.isEdit = false;
            $scope.current = null;
        }).error(function (response) { });

    };
    $scope.delete = function (cat) {

        if (confirm('Are you sure to delete!')) {
            $http.delete(baseUrl + "/ProductCategories(" + cat.CategoryID + ")").success(function (data) {
                $scope.Categorylist.splice($scope.Categorylist.indexOf(cat), 1);
            }).error(function (response) { });
        }


    };
    $scope.edit = function (cat) {
        $scope.current = cat;
        $scope.isEdit = true;
    };
})
.controller('orderCtrlAdmin', function ($scope, $http, baseUrl) {
    $scope.totalOrders = 0;
    $scope.orderlist = [];
    $http.get(baseUrl + '/OrderDetails').success(function (data) {
        $scope.orderlist = data.value;

        for (var i = 0; i < $scope.totalOrders.length; i++) {
            $scope.totalOrders += Number($scope.totalOrders[i].OrderQty)

        }
    }).error(function (data) {
    });
}).controller("AdminCRTL", function ($scope, $http, $location, baseUrl) {

    $scope.staffinfo = null;
    $http.get(baseUrl + "/Staffs").success(function (data) {
        $scope.staffinfo = data.value;
    });
    $scope.adminlogins = function (adminname, adminpassword) {
       
        for (i = 0; i < $scope.staffinfo.length; i++) {

            if (adminname == $scope.staffinfo[i].StaffEmail && adminpassword == $scope.staffinfo[i].StaffPassword) {
                alert($scope.staffinfo[i].StaffEmail)
                $location.path("/adminlog");
            }
        }
    }
})


    
