
angular.module('mainapp')
.controller('productCtrl', function ($scope, $http) {
   
    $scope.totalProduct =0;
    $scope.productlist = [];
    $scope.current = null;
    $scope.isEdit = false;
    $scope.getHead = function () {
        return $scope.isEdit ? "Update" : "Add New";
       
    };
    //var url = "http://localhost:53145/";


    //Get
    $http.get("http://saulhamid02-001-site1.ctempurl.com/odata/Products").success(function (data) {
        $scope.productlist = data.value;
       
        for (var i = 0; i < $scope.products.length; i++) {
            $scope.totalProduct +=Number( $scope.products[i].Pqty)
           
        }
    }).error(function (response) {
        
    });

    //for (var i = 0; i < products.length; i++) {
    //    $scope.totalProduct += $scope.products[i].Pqty;
    //}

    
   


    //Insert
    $scope.insert = function () {
        var newEmp = angular.copy($scope.current);
      var val=JSON.stringify(newEmp);
        $http.post("http://saulhamid02-001-site1.ctempurl.com/odata/Products", val).success(function (data) {
            $scope.products.push(data);
            $scope.current = null;
        }).error(function (response) {
        });
    };

 
    //Update
    $scope.update = function () {
        var newProduct = angular.copy($scope.current);
        $http.put("http://saulhamid02-001-site1.ctempurl.com/odata/Products(" + newProduct.ProductID + ")", newProduct).success(function (data) {
            $scope.isEdit = false;
            $scope.current = null;
        }).error(function (response) { });

    };
 


    //Delete
    $scope.delete = function (prod) {
       
        if (confirm('Are you sure to delete!')) {
            $http.delete("http://saulhamid02-001-site1.ctempurl.com/odata/Products(" + prod.ProductID + ")").success(function (data) {
                $scope.products.splice($scope.products.indexOf(prod), 1);
            }).error(function (response) { });
        }
      

    };
    $scope.edit = function (prod) {
        $scope.current = prod;
        $scope.isEdit = true;
    };


});