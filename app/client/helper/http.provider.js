angular
	.module('olaQueueApp.helper', [])
	.factory('httpHelper', ['$http', '$q', '$location', function ($http, $q, $location) {
		var config = {
			protocol: $location.protocol(),
			host: $location.host(),
			port: $location.port()
		};
		var apiNodeHost = `${config.protocol}://${config.host}:${config.port}/v1`;

		var service = {
			call: call
		};

		return service;
		/////////////////////
		// call(url, 'POST', { foo: bar }, optional_callback)
		function call() {
			// parse arguments
			var args = Array.prototype.slice.call(arguments);
			var url = args.shift(); //.replace(/^\//, '');
			url = apiNodeHost + url;
			var method = typeof (args[0]) === 'string' ? args.shift() : 'GET';
			var params = typeof (args[0]) === 'object' ? args.shift() : {};
			var headers = typeof (args[0]) === 'object' ? args.shift() : {};
			// merge in params
			params = angular.copy(params);

			// the promise to return
			var deffered = $q.defer();
			var httpPromise = null;

			// make actual HTTP call with promise
			switch (method) {
				case 'GET':
					httpPromise = $http.get(url, {
						params: params,
						headers: headers
					});
					break;
				case 'HEAD':
					httpPromise = $http.head(url, {
						params: params,
						headers: headers
					});
					break;
				case 'DELETE':
					httpPromise = $http['delete'](url, {
						params: params,
						headers: headers
					});
					break;
				case 'POST':
					//params are passed as data
					httpPromise = $http.post(url, params, {
						headers: headers
					});
					break;
				case 'PUT':
					//params are passed as data
					httpPromise = $http.put(url, params, {
						headers: headers
					});
					break;
				default:
					// reject using a bad request if an unknown verb is used
					httpPromise = deffered.promise;
					deffered.reject({
						'data': 'Unknown method' + method,
						'status': 400,
						'headers': function () {},
						'config': {}
					});
			}
			return httpPromise;
		}
	}]);