angular.module('mainapp')
.controller("cartSummaryController", function ($scope,$location, cart) {
    
    $scope.cartData = cart.getProducts();
    $scope.cartdetail = [];
    $scope.Paymenttype = null;
 
    $scope.total = function () {
        var total = 0;
        for (var i = 0; i < $scope.cartData.length; i++) {
            total += ($scope.cartData[i].UnitPrice * $scope.cartData[i].count);
        }
        return total;
        
    }
    $scope.totalqty = function () {
        var totalqty = 0;
        for (var i = 0; i < $scope.cartData.length; i++) {
            totalqty += $scope.cartData[i].count;

        }
        return totalqty;
    }

    $scope.remove = function (id) {
        cart.removeProduct(id);
    }
    //$scope.totalcart = function () {
    //    for (var i = 0; i < $scope.cartData.length; i++) {
    //        $scope.orderdel.ProductID = $scope.cartData[i].ProductID;
    //        $scope.orderdel.ProductID = $scope.cartData[i].ProductID;
    //        $scope.cartdetail += $scope.cartData[i].ProductName + ',' + $scope.cartData[i].Size
    //        alert('l')
         
    //    }
      
    //return $scope.cartdetail;
    //}
    $scope.loginstutes = function () {
      
        if (localStorage.getItem('CustomerName') == null) {
   
            $location.path("/placeorder");
        }
        else {
 
            $location.path("/ordersubmit");
        }
    }
   
});