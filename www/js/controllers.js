angular.module('ledcontrol.controllers', ['ledcontrol.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('IndexCtrl', function($rootScope, $scope, ledService) {

	$scope.$on('$ionicView.beforeEnter', function() {
		ledService.getState().then(function(response) {
			console.log(response.data);
			$scope.led = response.data;
		})
	})

	var _getLedState = function() {
		if(typeof $rootScope.led === 'undefined') {
			ledService.getState().then(function(response) {
				$scope.led = $rootScope.led;	
			});
		};
	}

	$scope.ledControl = function(state) {
		if(state) {
			ledService.turnOn();
		} else {
			ledService.turnOff();
		}
		$scope.led.state = !$scope.led.state;
	}

	_getLedState();
})

.controller('LedCtrl', function($scope, $stateParams, ledService) {
		
});
