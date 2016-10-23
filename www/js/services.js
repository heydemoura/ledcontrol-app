angular.module('ledcontrol.services', ['ledcontrol.const'])

.service('ledService', ledService);


ledService.$inject = ['$rootScope', '$q', '$http', 'config'];
function ledService($rootScope, $q, $http, config) {
	var _turnOn = function(relay) {
		return $http.post(config.server.url + ":" + config.server.port + '/cherry/on', {
			pin: relay
				});
	};

	var _turnOff = function(relay) {
		return $http.post(config.server.url + ":" + config.server.port + '/cherry/off', {
			pin: relay
				});
	};

	var _getState = function(relay) {
		var deferred = $q.defer();
		$http.get(config.server.url + ':' + config.server.port + '/cherry/', {
			pin: relay
		}).success(function(response) {
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
