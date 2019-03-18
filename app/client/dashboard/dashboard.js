'use strict';

angular.module('olaQueueApp.dashboard', ['ngRoute', 'angularMoment'])
  .config(['$routeProvider', function ($routeProvider, moment) {
    $routeProvider.when('/dashboard', {
      templateUrl: 'dashboard/dashboard.html',
      controller: 'DashboardCtrl'
    });
  }])


  .controller('DashboardCtrl', ['$scope', 'httpHelper', 'moment',
    function ($scope, httpHelper, moment) {
      function init() {
        getRiders();
      }
      $scope.getRiders = getRiders;

      function getRiders() {
        return httpHelper.call('/rider', 'GET')
          .then(function (riders) {
            if (riders && riders.data) {
              $scope.riders = riders.data.map(element => {
                element.elapsedTime = moment(element.createdAt).fromNow();
                return element;
              });
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      }
      init();
    }
  ]);