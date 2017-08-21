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
    .controller('HomeController', HomeController);

  function HomeController($scope, $http) {

    $http({
      method: 'GET',
      url: 'https://fumblie-backend.herokuapp.com/products'
    }).then(function successCallback(response) {
      $scope.products = response['data'].products;
    }, function errorCallback(response) {
      console.log("error: " + response);
    });


    $scope.addToCart = function(event) {

      if ($.cookie("cartCookie")) {
        $.cookie('cartCookie', $.cookie("cartCookie") + "-" + event.target.id);
      } else {
        $.cookie('cartCookie', event.target.id);
      }
      
    }
    

    this._init();
  }

  /**
   * initialize the controller
   */
  HomeController.prototype._init = function() {
    this.pageReady = true;

  };

})();
