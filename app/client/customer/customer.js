'use strict';

angular.module('olaQueueApp.customer', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/customer', {
      templateUrl: 'customer/customer.html',
      controller: 'CustomerCtrl'
    });
  }])

  .controller('CustomerCtrl', ['$scope', 'httpHelper', function ($scope, httpHelper) {
    function init() {
      $scope.showRideSuccess = false;
      $scope.showRideFail = false;
      $scope.fillCustId = false;
      $scope.riderStatus = false;
      $scope.status = '';
      $scope.requestRide = requestRide;
    }

    function requestRide() {
      $scope.showRideSuccess = false;
      $scope.showRideFail = false;
      $scope.fillCustId = false;
      $scope.riderStatus = false;
      $scope.status = '';
      if (!$scope.customerId) {
        $scope.fillCustId = true;
      }
      return httpHelper.call('/rider', 'POST', {
          customerId: $scope.customerId
        })
        .then(function (riders) {
          $scope.showRideSuccess = true;
        })
        .catch(function (err) {
          $scope.showRideFail = false;
          if (err.data.riderStatus) {
            $scope.riderStatus = true;
            $scope.status = err.data.riderStatus;
          }
        });
    }
    init();
  }]);