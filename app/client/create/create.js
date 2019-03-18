'use strict';

angular.module('olaQueueApp.create', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/create', {
      templateUrl: 'create/create.html',
      controller: 'CreateCtrl'
    });
  }])


  .controller('CreateCtrl', ['$scope', 'httpHelper',
    function ($scope, httpHelper) {

      function clearMsgs () {
        $scope.showCustomersuccess = false;
        $scope.showCustomererror = false;
        $scope.showDriversuccess = false;
        $scope.showDrivererror = false;
        $scope.customerErrorStatus = '';
        $scope.driverErrorStatus = '';
      }
      $scope.createCustomer = createCustomer;
      $scope.createDriver = createDriver;
      function createCustomer () {
        clearMsgs();
        return httpHelper.call(`/customer`, 'POST', {customerId : $scope.customerId})
          .then(function (riders) {
            if (riders && riders.data) {
              $scope.showCustomersuccess = true;
            }
          })
          .catch(function (err) {
            $scope.showCustomererror = true;
            if(err && err.data && err.data.errors && err.data.errors[0])
              $scope.customerErrorStatus = err.data.errors[0].message;
          });
      }

      function createDriver () {
        clearMsgs();
        return httpHelper.call(`/driver`, 'POST', {driverId : $scope.driverId})
          .then(function (riders) {
            if (riders && riders.data) {
              $scope.showDriversuccess = true;
            }
          })
          .catch(function (err) {
            $scope.showDrivererror = true;
            if(err && err.data && err.data.errors && err.data.errors[0])
              $scope.driverErrorStatus = err.data.errors[0].message;
          });
      }
    }
  ]);