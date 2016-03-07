/// <reference path="J:\OnlineStoreProject.UI\OnlineStoreProject.UI\Scripts/angular.js" />
angular.module('mainapp')
    .constant("productListActiveClass", "btn-success btn-block")
  .controller("productListCtrl", function ($scope, $filter, cart, productListActiveClass, $location, toastr) {
      toastr.info('Saul Hamidur Rahman','Wellcome to My Online Shopping Store');
      $scope.currentProduct = JSON.parse(localStorage.getItem('currentproduct'));
      var selectedCategory = null;
      toastr.active();
      $scope.selectCategory = function (newCategory) {
          toastr.info( newCategory+" Product has beening showing");
          selectedCategory = newCategory;
      }
      $scope.home = function () {
          selectedCategory = null;
      }
      $scope.productdetail = function (product) {
          localStorage.setItem('currentproduct', JSON.stringify(product));
          products = JSON.parse(localStorage.getItem('currentproduct'))
          selectedCategory = products.ProductCategories.Category
          $scope.currentProduct = products;
      }
      $scope.categoryFilterFn = function (product) {
          
          return selectedCategory == null ||
          product.ProductCategories.Category == selectedCategory;
      }
      $scope.getCategoryClass = function (item) {

          return selectedCategory == item ? productListActiveClass : "btn-block";
      }
      $scope.search = function (item) {
          if ($scope.searchText == undefined) {
              return true;
          }
          else {
              if (item.ProductName.toLowerCase()
                           .indexOf($scope.searchText.toLowerCase()) != -1 ||
                  item.ProductCategories.Category.toLowerCase()
                           .indexOf($scope.searchText.toLowerCase()) != -1) {
                  return true;
              }
          }
          return false;
      }
      
    
      $scope.addProductToCart = function (product, qty) {
          var sized = product.size == null ? "Large" : product.size;
     
          cart.addProduct(product.ProductID, product.ProductName, product.UnitPrice, sized, qty);
          toastr.success(product.ProductName + ' Add Your Shopping Cart');
      }
      $scope.addProductToCartDetail = function (product, qty) {
          var sized = product.size == null ? "Large" : product.size;

          cart.addProductDetail(product.ProductID, product.ProductName, product.UnitPrice, sized, qty);
          toastr.success(product.ProductName + ' Add Your Shopping Cart');

      }
      $scope.addProductToCartDetailBuyNow = function (product, qty) {
          var sized = product.size == null ? "Large" : product.size;
          cart.addProductDetail(product.ProductID, product.ProductName, product.UnitPrice, sized, qty);
          $location.path("/checkout");
      }
      $scope.GetSelectedCountry = function () {
          $scope.strCountry = document.getElementById("country").value;
          alert($scope.strCountry)
      };
      $scope.GetSelectedState = function () {
          $scope.strState = document.getElementById("state").value;
          alert($scope.strState)

      };
      $scope.updateCountry = function () {
          $scope.availableStates = [];

          angular.forEach($scope.states, function (value) {
              if (value.countryId == $scope.country1.id) {
                  $scope.availableStates.push(value);
              }
          });
      }
      $scope.productprice = false;
      $scope.hoverin = function () {
          this.productprice = true;
      };
      $scope.hoverout = function () {
         this.productprice = false;
      }
      $scope.cart = cart;

  });




    