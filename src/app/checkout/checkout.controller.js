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

  function CheckoutController($scope, $http) {
    var self = this;

   	$scope.triggerSendMail = function() {
   	/*	var mailBodyJson = {
   			mailBody: $scope.firstname + "product IDs:" + $.cookie("cartCookie"),
   			mailSubject: "New Order"
   		}*/

      var bodyJson = {
        "firstname": $scope.firstname,
        "productIds": $.cookie("cartCookie")
      }
   		sendMail($scope.firstname, $.cookie("cartCookie"));
   	}

    $('.product-ids').val($.cookie("cartCookie"));

    function sendMail(a, b) {
  /* var mailJSON ={
        "key": "xe8cCGETdLSJyXupMsa7dA",
        "message": {
          "html": ""+a.mailBody,
          "text": ""+a.mailBody,
          "subject": "New Order",
          "from_email": "orders@ugence.com",
          "from_name": "Orders",
          "to": [
            {
              "email": "mariana.kyrkosh@gmail.com",
              "name": "Mariana Kyrkosh",
              "type": "to"
            }
          ],
          "important": false,
          "track_opens": null,
          "track_clicks": null,
          "auto_text": null,
          "auto_html": null,
          "inline_css": null,
          "url_strip_qs": null,
          "preserve_recipients": null,
          "view_content_link": null,
          "tracking_domain": null,
          "signing_domain": null,
          "return_path_domain": null
        },
        "async": false,
        "ip_pool": "Main Pool"
    };*/
    //var apiURL = "https://mandrillapp.com/api/1.0/messages/send.json";
    var mailJSON = {
       "address": {
    "city": "string",
    "country": "string",
    "id": 0,
    "name": a,
    "street": b,
    "zipCode": "string"
  },
  "currency": "string",
  "id": 0,
  "orderItems": [
    {
      "id": 0,
      "productId": 0,
      "quantity": 0
    }
  ],
  "totalAmount": 0
}

var apiURL = "https://fumblie-backend.herokuapp.com/order";
    $http({
        url: apiURL, 
        method: "POST",
        data: mailJSON
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
