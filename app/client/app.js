'use strict';

// Declare app level module which depends on views, and core components
angular.module('olaQueueApp', [
  'ngRoute',
  'olaQueueApp.customer',
  'olaQueueApp.dashboard',
  'olaQueueApp.driver',
  'olaQueueApp.helper',
  'olaQueueApp.create'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/customer'});
}]);
