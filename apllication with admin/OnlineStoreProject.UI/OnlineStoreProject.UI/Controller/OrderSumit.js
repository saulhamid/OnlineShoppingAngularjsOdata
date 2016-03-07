/// <reference path="H:\project\Final 1\OnlineProject\OnlineProject\OnlineProject\apllication with admin\OnlineStoreProject.UI\OnlineStoreProject.UI\Scripts/jquery-2.2.0.js" />

angular.module('mainapp')
.controller("OrderSubmit", function ($scope, $http,$location, cart, toastr) {
    $scope.cartData = cart.getProducts();
    $scope.orderDetail = {};
    $scope.data = JSON.stringify($scope.cartData);
    $scope.item = null;
    $scope.invoiceid = null;
    $scope.OrderDate = null;
    //alert(JSON.stringify($scope.cartData))
    $scope.printDiv = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        alert("Waiting For Printing")
    }
   
    var dates = new Date()
    $scope.OrderDate = dates.toDateString();
    var date = dates.toDateString();

    var customerid = localStorage.getItem('custid')
    //alert(customerid);
    $scope.invoiceid = localStorage.getItem('invoceid')
    var invoiceid = localStorage.getItem('invoceid');
    //alert(invoiceid)
    $scope.orderDetail = {
        InvoiceID:'', OrderItems: '',
        OrderDate: '', OrderQty:'', ProductSize: 'x',
        OrderAmount: '',
        ProductID: '', PaymantDetailsID: '1', CustomerID: ''
    }
    for (var i = 0; i < $scope.cartData.length; i++) {
        var datacount = $scope.cartData[i].count;
        var datapro = $scope.cartData[i].ProductName;
        var datauni = $scope.cartData[i].UnitPrice;
        var dataproid = $scope.cartData[i].ProductID;
        var size = $scope.cartData[i].Size
    }
        $scope.orderDetail = {
            InvoiceID: invoiceid, OrderItems: datapro,
            OrderDate: $scope.OrderDate, OrderQty: datacount, ProductSize: size,
            OrderAmount: datauni,
            ProductID: Number(dataproid), PaymantDetailsID: Number(1), CustomerID: Number(customerid)
        }

       $scope.Submitorder = function (item) {
           try {
               var submit = confirm("Do Your Want Order Above Products")
               if ($scope.cartData != null && submit == true) {
                   for (var i = 0; i < $scope.cartData.length; i++) {
                       var datacount = $scope.cartData[i].count;
                       var datapro = $scope.cartData[i].ProductName;
                       var datauni = $scope.cartData[i].UnitPrice;
                       var dataproid = $scope.cartData[i].ProductID;
                       var size = $scope.cartData[i].Size
                       $scope.orderDetail = {
                           InvoiceID: invoiceid, OrderItems: datapro,
                           OrderDate: $scope.OrderDate, OrderQty: String(datacount), ProductSize: size,
                           OrderAmount: datauni,
                           ProductID: Number(dataproid), PaymantDetailsID: Number(item), CustomerID: Number(customerid)
                       }
                       var value = JSON.stringify($scope.orderDetail)
            
                       $http.post("http://localhost:1895/odata/OrderDetails/", value).success(function (data, stutes) {
                     
                           $scope.customers.push(data);
                           $scope.current = null;
                           localStorage.setItem('cartData', null);
                           $location.path("/ordersubmit");
                         
                       }).error(function (response) {
                  		
                       });
                   }

               }
               else {
                   toastr.warning("Your Shopping cart is empty")
               }
               toastr.success("Mr.  "+localStorage.getItem('username')+"  Succefully Submited")
           }
           catch (error) {

               toastr.error("Your Product not Submited" + error);
           }
      
    }

    $scope.checkoutpaypal = function () {
        
      
    //alert(JSON.stringify($scope.cartData))
        var data = {
            cmd: "_xclick",
            business: "saulnoo2@gmail.com",
            upload: "1",
            rm: "2",
            charset: "utf-8"
        };
        for (var i = 0; i < $scope.cartData.length; i++) {
            var cart = $scope.cartData[i];
            alert(cart.ProductID)
            var ctr = i + 1;
            data[item_number_] = cart.ProductID;
            data["item_name_" + ctr] = cart.ProductName;
            data["quantity_" + ctr] = cart.count;
            data["amount_" + ctr] = cart.UnitPrice;
        }
        var form = $('<form/></form>');
        form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
        form.attr("method", "POST");
        form.attr("style", "display:none;");
        $scope.addFormFields(form, data);
        //$scope.addFormFields(form, parms.options);
        $("body").append(form);

        // submit form
        cartData = null
        form.submit();
        form.remove();

    };
    $scope.addFormFields = function (form, data) {
        if (data != null) {
          $.each(data, function (name, value) {
                if (value != null) {
                    var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                    form.append(input);
                    alert('done')

                }
            });
        }
    }

    
    //$scope.savepdf = function () {
        
    //    var doc = new jsPDF();
    //    var elementHandler = {
    //        '#ignorePDF': function (element, renderer) {
    //            return true;
    //        }
    //    };
    //    var source = window.document.getElementsByTagName("body")[0];
    //    doc.fromHTML(
    //        source,
    //        15,
    //        15,
    //        {
    //            'width': 180, 'elementHandlers': elementHandler
    //        });

    //    doc.output("dataurlnewwindow");
    //    alert("Waiting For Printing in PDF Format")
    //}
});