/**
* angular-starter-kit
*
* @author Andrea SonnY <andreasonny83@gmail.com>
* @copyright 2016 Andrea SonnY <andreasonny83@gmail.com>
*
* This code may only be used under the MIT style license.
*
* @license MIT  https://andreasonny.mit-license.org/@2016/
*/
(function() {
  'use strict';

  angular
    .module('app')
    .controller('CheckoutController', CheckoutController);

  function CheckoutController($scope, $http, $q) {
    var self = this;
    $scope.products = [];

    $('.product-ids').val($.cookie("cartCookie"));

   	$scope.triggerSendMail = function() {
      var promise = getProducts($.cookie("cartCookie").split("-"));

      promise.then(function(){
console.log($scope.products);

        var orders = [],
            totalAmount = 0;
        
        $.each($scope.products, function(index, product){
          var order = {
            "id": index,
            "product": product,
            "quantity": 1
          };

          orders.push(JSON.stringify(order));

          totalAmount += product.price;
        });

/*
        var bodyJson = {
          "address": {
            "city": "Munich",
            "country": "Germany",
            "id": 1,
            "name": $scope.firstname,
            "street": "Sonnestrasse 15",
            "zipCode": "80331"
          },
          "currency": "EUR",
          "id": 2,
          "orderItems": [
              {
                "id": 1,
                "product": {
                  "description": "test",
                  "id": 1,
                  "image": "string",
                  "price": 0,
                  "title": "string"
                },
                "quantity": 0
              }
            ],
          "totalAmount": 0
        }
/*
        var bodyJson = {
          "address": {
            "city": "Munich",
            "country": "Germany",
            "id": 1,
            "name": $scope.firstname,
            "street": "Sonnestrasse 15",
            "zipCode": "80331"
          },
          "currency": "EUR",
          "id": 2,
          "orderItems": orders,
          "totalAmount": totalAmount
        }
*/
//        sendMail(bodyJson);
      });
   	}

    function getProducts(ids){
      var deferred = $q.defer(),
          products = [],
          exit = false;

      $.each(ids, function(index, value){
          getProduct(value)
            .then(function(product){
              if(product){
                products.push(product);
                $scope.products = products;
              }
            });

        if(index === ids.length - 1){
          exit = true;
        }
      });

      if(exit){
        deferred.resolve(products);
        return deferred.promise;
      }
    };

    function getProduct(id){
      var deferred = $q.defer();
      $http.get('https://fumblie-backend.herokuapp.com/products/' + id)
           .then(function(response){
              deferred.resolve(JSON.stringify(response.data.product));
           }, function(msg){
              deferred.reject;
           });
      return deferred.promise;
    }

    function sendMail(bodyJson) {
      var apiURL = "https://fumblie-backend.herokuapp.com/order";
      $http({
          url: apiURL, 
          method: "POST",
          data: bodyJson
      });
    }

    this._init();
  }



  /**
   * initialize the controller
   */
  CheckoutController.prototype._init = function() {
    this.pageReady = true;
  };



  //HomeController.$inject = ['$mdToast'];
})();
