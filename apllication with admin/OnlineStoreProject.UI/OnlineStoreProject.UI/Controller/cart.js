/// <reference path="H:\OnlineStoreProject.UI\OnlineStoreProject.UI\Scripts/angular.js" />

var app = angular.module("cart", [])
.factory("cart", function () {
    checkoutParameters = {};
    var cardats= localStorage.getItem('cartData');
    var cartData = JSON.parse(cardats) || [];
    function save() {
        localStorage.setItem('cartData', JSON.stringify(cartData));
    }
    return {
        addProduct: function (id, name, price, size, qty) {

            qty = Number(qty);
            //$scope.productmessage =" Product :"+ name + "has been add your cart";

            var addedToExistingItem = false;
            for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].ProductID == id) {

                    cartData[i].count = cartData[i].count + Number(qty);
                    addedToExistingItem = true;
                    break;
                }
            }
            if (!addedToExistingItem) {
                cartData.push({
                    count: 1, ProductID: id, ProductName: name, UnitPrice: price, Size: size
                });
            }
            save();

        },
        addProductDetail: function (id, name, price, size, qty) {

            qty = Number(qty);
            //$scope.productmessage =" Product :"+ name + "has been add your cart";

            var addedToExistingItem = false;
            for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].ProductID == id) {

                    cartData[i].count = Number(qty);
                    addedToExistingItem = true;
                    break;
                }
            }
            if (!addedToExistingItem) {
                cartData.push({
                    count: 1, ProductID: id, ProductName: name, UnitPrice: price, Size: size
                });
            }
            save();

        },

        removeProduct: function (id) {
            for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].ProductID == id) {
                    cartData.splice(i, 1);
                    break;
                }
            }
            save();
        },
        getProducts: function () {
            return cartData;
        }
    }
})
.directive("cartSummary", function (cart) {
    return {
        restrict: "E",
        templateUrl: "View/cartSummary.html",
        controller: function ($scope) {
            var cartData = cart.getProducts();
            $scope.total = function () {
                var total = 0;
                for (var i = 0; i < cartData.length; i++) {
                    total += (cartData[i].UnitPrice * cartData[i].count);
                }
                return total;
            }
         

            $scope.itemCount = function () {
                var total = 0;
                for (var i = 0; i < cartData.length; i++) {
                    total += cartData[i].count;
                }
                return total;
            }
        }
    };
});

