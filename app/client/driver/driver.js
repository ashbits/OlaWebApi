'use strict';

angular.module('olaQueueApp.driver', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/driver/:id', {
      templateUrl: 'driver/driver.html',
      controller: 'DriverCtrl'
    });
  }])

  .controller('DriverCtrl', ['$scope', 'httpHelper', '$route', 'moment',
    function ($scope, httpHelper, $route, moment) {
      function init() {
        getRiders();
      }
      var rideStatus = {
        "wait": "Waiting",
        "ongoing": "Ongoing",
        "completed": "Completed"
      };
      $scope.getRiders = getRiders;
      $scope.selectRiders = selectRiders;

      function getRiders() {
        $scope.rideTypes = {
          wait: [],
          ongoing: [],
          completed: []
        };
        $scope.id = $route.current.params.id;
        return httpHelper.call(`/driver/${$scope.id}/rider`, 'GET')
          .then(function (riders) {
            if (riders && riders.data) {
              $scope.riders = riders.data.map(element => {
                element.requestTime = elapsedTime(element.createdAt);
                element.pickedUpTime = elapsedTime(element.rideStartTime);
                element.completeTime = elapsedTime(element.rideEndTime);
                return element;
              });
            }
            $scope.riders.forEach(element => {
              switch (element.rideStatus) {
                case rideStatus.wait:
                  $scope.rideTypes.wait.push(element);
                  break;
                case rideStatus.ongoing:
                  $scope.rideTypes.ongoing.push(element);
                  break;
                case rideStatus.completed:
                  $scope.rideTypes.completed.push(element);
                  break;
              }
            });
          })
          .catch(function (err) {
            console.log(err);
          });
      }

      function selectRiders(rider) {
        rider.driverId = $scope.id;
        return httpHelper.call(`/driver/rider`, 'POST', rider)
          .then(function (riders) {
            getRiders();
          });
      }

      function elapsedTime(time) {
        return moment(time).fromNow();
      }
      init();
    }
  ]);