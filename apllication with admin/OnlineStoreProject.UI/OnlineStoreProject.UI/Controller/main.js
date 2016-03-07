
angular.module("mainapp", ["ngRoute", "cart", "increment", "ngAnimate", "toastr"])
    .config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 5,    
            newestOnTop: true,
            positionClass: 'toast-top-left',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',
            allowHtml: false,
        closeButton: false,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 1000,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
        },  
        messageClass: 'toast-message',
        onHidden: null,
        onShown: null,
        onTap: null,
        progressBar: true,
        tapToDismiss: true,
        templates: {
            toast: 'directives/toast/toast.html',
            progressbar: 'directives/progressbar/progressbar.html'
        },
        maxNumber:4,
        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
        });
    }).constant("baseUrl", "http://saulhamid02-001-site1.ctempurl.com")
       .config(function ($routeProvider) {
           $routeProvider.when("/index", {
               templateUrl: "/Index.html"
           });
           $routeProvider.when("/ProductDetail", {
               templateUrl: "/View/ProductDetail.html"
           });
           $routeProvider.when("/search", {
               templateUrl: "/View/SearchView.html"
           });
           $routeProvider.when("/checkout", {
               templateUrl: "/View/checkoutSummary.html"
           });
           $routeProvider.when("/products", {
               templateUrl: "/View/ProductView.html"
           });
           $routeProvider.when("/about", {
               templateUrl: "/View/aboutUs.html"
           });
           $routeProvider.when("/placeorder", {
               templateUrl: "/placeOrder.html"
           });
           $routeProvider.when("/register", {
               templateUrl: "/View/Customers.html"
           });
           $routeProvider.when("/ordersubmit", {
               templateUrl: "/OrderSubmit.html"
           });
           $routeProvider.when("/menu1", {
               templateUrl: "/View/ProductDetail.html"
           });
           $routeProvider.when("/menu2", {
               templateUrl: "/View/ProductDetail.html"
           });
           //$routeProvider.when("/menu3", {
           //    templateUrl: "/View/ProductDetail.html"
           //});
           //$routeProvider.when("/cus1", {
           //    templateUrl: "/View/CustomerAccount.html"
           //});
           //$routeProvider.when("/cus2", {
           //    templateUrl: "/View/CustomerAccount.html"
           //});
           //$routeProvider.when("/cus3", {
           //    templateUrl: "/View/CustomerAccount.html"
           //});
           $routeProvider.when("/fogetpass", {
               templateUrl: "/View/ForgetPassword.html"
           });
           $routeProvider.when("/custaccount", {
               templateUrl: "/View/CustomerAccount.html"
           });
           $routeProvider.when("/recovermail", {
               templateUrl: "/RecoverPassword.html"
           });
           $routeProvider.when("/admin", {
               templateUrl: "/adminDasboard.html"
           });
           $routeProvider.when("/adminlogin", {
               templateUrl: "Admin/AdminLogin.html"
           });
           $routeProvider.when("/login", {
               templateUrl: "/View/placeOrder.html"
           });
           $routeProvider.when("/registraton", {
               templateUrl: "/View/placeOrder.html"
           });
           $routeProvider.when("/contact", {
               templateUrl: "/View/ContactUs.html"
           });
           $routeProvider.when("/howtoorder", {
               templateUrl: "/View/howtopurchage.html"
           });
           $routeProvider.when("/faq", {
               templateUrl: "/View/faq.html"
           });
           
           $routeProvider.when("/adminlogin", {
               templateUrl: "/Admin/AdminLogin.html"
           });
           $routeProvider.when("/product", {
               templateUrl: "/Admin/Product.html"
           });
           $routeProvider.when("/category", {
               templateUrl: "/Admin/Category.html"
           });
           $routeProvider.when("/suplier", {
               templateUrl: "/Admin/Supplier.html"
           });
           $routeProvider.when("/adminproduct", {
               templateUrl: "/Admin/ProductDetails.html"
           });
           $routeProvider.when("/service", {
               templateUrl: "/View/Delevery.html"
           });
           $routeProvider.when("/adminlog", {
               templateUrl: "/adminDasboard.html"
           });
           $routeProvider.when("/sitemap", {
               templateUrl: "/View/sitemappage.html"
           });
           $routeProvider.otherwise({
               templateUrl: "/View/ProductView.html"
           });
       })
.controller('productCrlt', function ($scope, $http, $timeout, baseUrl, toastr) {
    toastr.active();
    $scope.incrementvalue = 1;
    $scope.error = null;
    $scope.productmessage = null;
    (function () {
        $timeout(function () {
            $scope.productmessage = null;
        }, 3000);

    })
    $http.get(baseUrl + '/Products?$expand=ProductCategories').success(function (data) {
        $scope.productlist = data.value;
    }).error(function (data) {
        
        toastr.error("Products Not Found",+data);

    });
    $http.get(baseUrl + '/ProductCategories').success(function (data) {
        $scope.productCategory = data.value;
    }).error(function (data) {
        toastr.error("Product Categories Not Found", +data);
    });
    $http.get(baseUrl + '/Products?$expand=ProductCategories&$top=10').success(function (data) {
        $scope.producttop10 = data.value
    }).error(function (data) {
        toastr.error(" Top 10 Products Not Found", +data);
    });
    $http.get(baseUrl + '/OrderDetails?$orderby=InvoiceID%20desc&$select=InvoiceID&$top=1').success(function (data) {
        $scope.Invoicelast = data.value;
        var invoiceid = Number($scope.Invoicelast[0].InvoiceID) + 1
        localStorage.setItem('invoceid', invoiceid)
    }).error(function (data) {
        toastr.error("Invoceid not generated", +data);
    });
    $http.get(baseUrl + '/PaymantDetails').success(function (data) {
        $scope.PaymentDetails = data.value;
    }).error(function (data) {
        toastr.error("PaymantDetails Not Found", +data);
    })
    $http.get(baseUrl + "/Customers/").success(function (data) {
        $scope.customerInfo = data.value;
    }).error(function (data) {
        toastr.error("Customers0 Not Found", +data);

    });
    //$scope.countries = [{
    //    "name": "USA",
    //    "id": 1
    //}, {
    //    "name": "Canada",
    //    "id": 2
    //}];
    //$scope.states = [{
    //    "name": "Alabama",
    //    "id": 1,
    //    "countryId": 1
    //}, {
    //    "name": "Alaska",
    //    "id": 2,
    //    "countryId": 1
    //}, {
    //    "name": "Arizona",
    //    "id": 3,
    //    "countryId": 1
    //}, {
    //    "name": "Alberta",
    //    "id": 4,
    //    "countryId": 2
    //}, {
    //    "name": "British columbia",
    //    "id": 5,
    //    "countryId": 2
    //}];
                //   $scope.countries = {
                //    'India': {
                //        'Andhra Pradesh': ['Vijayawada', 'Guntur', 'Nellore', 'Kadapa'],
                //        'Madhya Pradesh': ['Hyderabad', 'Warangal', 'Karimnagar'],  
                //    },
                //    'USA': {
                //      'San Francisco': ['SOMA', 'Richmond', 'Sunset'],
                //      'Los Angeles': ['Burbank', 'Hollywood']
                //    },
                //    'Australia': {
                //        'New South Wales': ['Sydney','Orange','Broken Hill'],
                //        'Victoria': ['Benalla','Melbourne']
                //    }
                //};
    ////$scope.name = 'World';

    $scope.countriess = [
      { name: 'Afghanistan', code: 'AF' },
      { name: 'Åland Islands', code: 'AX' },
      { name: 'Albania', code: 'AL' },
      { name: 'Algeria', code: 'DZ' },
      { name: 'American Samoa', code: 'AS' },
      { name: 'Andorra', code: 'AD' },
      { name: 'Angola', code: 'AO' },
      { name: 'Anguilla', code: 'AI' },
      { name: 'Antarctica', code: 'AQ' },
      { name: 'Antigua and Barbuda', code: 'AG' },
      { name: 'Argentina', code: 'AR' },
      { name: 'Armenia', code: 'AM' },
      { name: 'Aruba', code: 'AW' },
      { name: 'Australia', code: 'AU' },
      { name: 'Austria', code: 'AT' },
      { name: 'Azerbaijan', code: 'AZ' },
      { name: 'Bahamas', code: 'BS' },
      { name: 'Bahrain', code: 'BH' },
      { name: 'Bangladesh', code: 'BD' },
      { name: 'Barbados', code: 'BB' },
      { name: 'Belarus', code: 'BY' },
      { name: 'Belgium', code: 'BE' },
      { name: 'Belize', code: 'BZ' },
      { name: 'Benin', code: 'BJ' },
      { name: 'Bermuda', code: 'BM' },
      { name: 'Bhutan', code: 'BT' },
      { name: 'Bolivia', code: 'BO' },
      { name: 'Bosnia and Herzegovina', code: 'BA' },
      { name: 'Botswana', code: 'BW' },
      { name: 'Bouvet Island', code: 'BV' },
      { name: 'Brazil', code: 'BR' },
      { name: 'British Indian Ocean Territory', code: 'IO' },
      { name: 'Brunei Darussalam', code: 'BN' },
      { name: 'Bulgaria', code: 'BG' },
      { name: 'Burkina Faso', code: 'BF' },
      { name: 'Burundi', code: 'BI' },
      { name: 'Cambodia', code: 'KH' },
      { name: 'Cameroon', code: 'CM' },
      { name: 'Canada', code: 'CA' },
      { name: 'Cape Verde', code: 'CV' },
      { name: 'Cayman Islands', code: 'KY' },
      { name: 'Central African Republic', code: 'CF' },
      { name: 'Chad', code: 'TD' },
      { name: 'Chile', code: 'CL' },
      { name: 'China', code: 'CN' },
      { name: 'Christmas Island', code: 'CX' },
      { name: 'Cocos (Keeling) Islands', code: 'CC' },
      { name: 'Colombia', code: 'CO' },
      { name: 'Comoros', code: 'KM' },
      { name: 'Congo', code: 'CG' },
      { name: 'Congo, The Democratic Republic of the', code: 'CD' },
      { name: 'Cook Islands', code: 'CK' },
      { name: 'Costa Rica', code: 'CR' },
      { name: 'Cote D\'Ivoire', code: 'CI' },
      { name: 'Croatia', code: 'HR' },
      { name: 'Cuba', code: 'CU' },
      { name: 'Cyprus', code: 'CY' },
      { name: 'Czech Republic', code: 'CZ' },
      { name: 'Denmark', code: 'DK' },
      { name: 'Djibouti', code: 'DJ' },
      { name: 'Dominica', code: 'DM' },
      { name: 'Dominican Republic', code: 'DO' },
      { name: 'Ecuador', code: 'EC' },
      { name: 'Egypt', code: 'EG' },
      { name: 'El Salvador', code: 'SV' },
      { name: 'Equatorial Guinea', code: 'GQ' },
      { name: 'Eritrea', code: 'ER' },
      { name: 'Estonia', code: 'EE' },
      { name: 'Ethiopia', code: 'ET' },
      { name: 'Falkland Islands (Malvinas)', code: 'FK' },
      { name: 'Faroe Islands', code: 'FO' },
      { name: 'Fiji', code: 'FJ' },
      { name: 'Finland', code: 'FI' },
      { name: 'France', code: 'FR' },
      { name: 'French Guiana', code: 'GF' },
      { name: 'French Polynesia', code: 'PF' },
      { name: 'French Southern Territories', code: 'TF' },
      { name: 'Gabon', code: 'GA' },
      { name: 'Gambia', code: 'GM' },
      { name: 'Georgia', code: 'GE' },
      { name: 'Germany', code: 'DE' },
      { name: 'Ghana', code: 'GH' },
      { name: 'Gibraltar', code: 'GI' },
      { name: 'Greece', code: 'GR' },
      { name: 'Greenland', code: 'GL' },
      { name: 'Grenada', code: 'GD' },
      { name: 'Guadeloupe', code: 'GP' },
      { name: 'Guam', code: 'GU' },
      { name: 'Guatemala', code: 'GT' },
      { name: 'Guernsey', code: 'GG' },
      { name: 'Guinea', code: 'GN' },
      { name: 'Guinea-Bissau', code: 'GW' },
      { name: 'Guyana', code: 'GY' },
      { name: 'Haiti', code: 'HT' },
      { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
      { name: 'Holy See (Vatican City State)', code: 'VA' },
      { name: 'Honduras', code: 'HN' },
      { name: 'Hong Kong', code: 'HK' },
      { name: 'Hungary', code: 'HU' },
      { name: 'Iceland', code: 'IS' },
      { name: 'India', code: 'IN' },
      { name: 'Indonesia', code: 'ID' },
      { name: 'Iran, Islamic Republic Of', code: 'IR' },
      { name: 'Iraq', code: 'IQ' },
      { name: 'Ireland', code: 'IE' },
      { name: 'Isle of Man', code: 'IM' },
      { name: 'Israel', code: 'IL' },
      { name: 'Italy', code: 'IT' },
      { name: 'Jamaica', code: 'JM' },
      { name: 'Japan', code: 'JP' },
      { name: 'Jersey', code: 'JE' },
      { name: 'Jordan', code: 'JO' },
      { name: 'Kazakhstan', code: 'KZ' },
      { name: 'Kenya', code: 'KE' },
      { name: 'Kiribati', code: 'KI' },
      { name: 'Korea, Democratic People\'s Republic of', code: 'KP' },
      { name: 'Korea, Republic of', code: 'KR' },
      { name: 'Kuwait', code: 'KW' },
      { name: 'Kyrgyzstan', code: 'KG' },
      { name: 'Lao People\'s Democratic Republic', code: 'LA' },
      { name: 'Latvia', code: 'LV' },
      { name: 'Lebanon', code: 'LB' },
      { name: 'Lesotho', code: 'LS' },
      { name: 'Liberia', code: 'LR' },
      { name: 'Libyan Arab Jamahiriya', code: 'LY' },
      { name: 'Liechtenstein', code: 'LI' },
      { name: 'Lithuania', code: 'LT' },
      { name: 'Luxembourg', code: 'LU' },
      { name: 'Macao', code: 'MO' },
      { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
      { name: 'Madagascar', code: 'MG' },
      { name: 'Malawi', code: 'MW' },
      { name: 'Malaysia', code: 'MY' },
      { name: 'Maldives', code: 'MV' },
      { name: 'Mali', code: 'ML' },
      { name: 'Malta', code: 'MT' },
      { name: 'Marshall Islands', code: 'MH' },
      { name: 'Martinique', code: 'MQ' },
      { name: 'Mauritania', code: 'MR' },
      { name: 'Mauritius', code: 'MU' },
      { name: 'Mayotte', code: 'YT' },
      { name: 'Mexico', code: 'MX' },
      { name: 'Micronesia, Federated States of', code: 'FM' },
      { name: 'Moldova, Republic of', code: 'MD' },
      { name: 'Monaco', code: 'MC' },
      { name: 'Mongolia', code: 'MN' },
      { name: 'Montserrat', code: 'MS' },
      { name: 'Morocco', code: 'MA' },
      { name: 'Mozambique', code: 'MZ' },
      { name: 'Myanmar', code: 'MM' },
      { name: 'Namibia', code: 'NA' },
      { name: 'Nauru', code: 'NR' },
      { name: 'Nepal', code: 'NP' },
      { name: 'Netherlands', code: 'NL' },
      { name: 'Netherlands Antilles', code: 'AN' },
      { name: 'New Caledonia', code: 'NC' },
      { name: 'New Zealand', code: 'NZ' },
      { name: 'Nicaragua', code: 'NI' },
      { name: 'Niger', code: 'NE' },
      { name: 'Nigeria', code: 'NG' },
      { name: 'Niue', code: 'NU' },
      { name: 'Norfolk Island', code: 'NF' },
      { name: 'Northern Mariana Islands', code: 'MP' },
      { name: 'Norway', code: 'NO' },
      { name: 'Oman', code: 'OM' },
      { name: 'Pakistan', code: 'PK' },
      { name: 'Palau', code: 'PW' },
      { name: 'Palestinian Territory, Occupied', code: 'PS' },
      { name: 'Panama', code: 'PA' },
      { name: 'Papua New Guinea', code: 'PG' },
      { name: 'Paraguay', code: 'PY' },
      { name: 'Peru', code: 'PE' },
      { name: 'Philippines', code: 'PH' },
      { name: 'Pitcairn', code: 'PN' },
      { name: 'Poland', code: 'PL' },
      { name: 'Portugal', code: 'PT' },
      { name: 'Puerto Rico', code: 'PR' },
      { name: 'Qatar', code: 'QA' },
      { name: 'Reunion', code: 'RE' },
      { name: 'Romania', code: 'RO' },
      { name: 'Russian Federation', code: 'RU' },
      { name: 'Rwanda', code: 'RW' },
      { name: 'Saint Helena', code: 'SH' },
      { name: 'Saint Kitts and Nevis', code: 'KN' },
      { name: 'Saint Lucia', code: 'LC' },
      { name: 'Saint Pierre and Miquelon', code: 'PM' },
      { name: 'Saint Vincent and the Grenadines', code: 'VC' },
      { name: 'Samoa', code: 'WS' },
      { name: 'San Marino', code: 'SM' },
      { name: 'Sao Tome and Principe', code: 'ST' },
      { name: 'Saudi Arabia', code: 'SA' },
      { name: 'Senegal', code: 'SN' },
      { name: 'Serbia and Montenegro', code: 'CS' },
      { name: 'Seychelles', code: 'SC' },
      { name: 'Sierra Leone', code: 'SL' },
      { name: 'Singapore', code: 'SG' },
      { name: 'Slovakia', code: 'SK' },
      { name: 'Slovenia', code: 'SI' },
      { name: 'Solomon Islands', code: 'SB' },
      { name: 'Somalia', code: 'SO' },
      { name: 'South Africa', code: 'ZA' },
      { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
      { name: 'Spain', code: 'ES' },
      { name: 'Sri Lanka', code: 'LK' },
      { name: 'Sudan', code: 'SD' },
      { name: 'Suriname', code: 'SR' },
      { name: 'Svalbard and Jan Mayen', code: 'SJ' },
      { name: 'Swaziland', code: 'SZ' },
      { name: 'Sweden', code: 'SE' },
      { name: 'Switzerland', code: 'CH' },
      { name: 'Syrian Arab Republic', code: 'SY' },
      { name: 'Taiwan, Province of China', code: 'TW' },
      { name: 'Tajikistan', code: 'TJ' },
      { name: 'Tanzania, United Republic of', code: 'TZ' },
      { name: 'Thailand', code: 'TH' },
      { name: 'Timor-Leste', code: 'TL' },
      { name: 'Togo', code: 'TG' },
      { name: 'Tokelau', code: 'TK' },
      { name: 'Tonga', code: 'TO' },
      { name: 'Trinidad and Tobago', code: 'TT' },
      { name: 'Tunisia', code: 'TN' },
      { name: 'Turkey', code: 'TR' },
      { name: 'Turkmenistan', code: 'TM' },
      { name: 'Turks and Caicos Islands', code: 'TC' },
      { name: 'Tuvalu', code: 'TV' },
      { name: 'Uganda', code: 'UG' },
      { name: 'Ukraine', code: 'UA' },
      { name: 'United Arab Emirates', code: 'AE' },
      { name: 'United Kingdom', code: 'GB' },
      { name: 'United States', code: 'US' },
      { name: 'United States Minor Outlying Islands', code: 'UM' },
      { name: 'Uruguay', code: 'UY' },
      { name: 'Uzbekistan', code: 'UZ' },
      { name: 'Vanuatu', code: 'VU' },
      { name: 'Venezuela', code: 'VE' },
      { name: 'Vietnam', code: 'VN' },
      { name: 'Virgin Islands, British', code: 'VG' },
      { name: 'Virgin Islands, U.S.', code: 'VI' },
      { name: 'Wallis and Futuna', code: 'WF' },
      { name: 'Western Sahara', code: 'EH' },
      { name: 'Yemen', code: 'YE' },
      { name: 'Zambia', code: 'ZM' },
      { name: 'Zimbabwe', code: 'ZW' }
    ];
   

});