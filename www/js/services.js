angular.module('ledcontrol.services', ['ledcontrol.const'])

.service('ledService', ledService);


ledService.$inject = ['$rootScope', '$q', '$http', 'config'];
function ledService($rootScope, $q, $http, config) {
	var _turnOn = function() {
		return $http.post(config.server.url + ":" + config.server.port + '/leds/on');
	};

	var _turnOff = function() {
		return $http.post(config.server.url + ":" + config.server.port + '/leds/off');
	};

	var _getState = function() {
		var deferred = $q.defer();
		$http.get(config.server.url + ':' + config.server.port + '/leds/').success(function(response) {
			deferred.resolve(response);
			$rootScope.led = response.data.data;
		}).error(function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	return {
		turnOn: _turnOn,
		turnOff: _turnOff,
		getState: _getState
	}
}
