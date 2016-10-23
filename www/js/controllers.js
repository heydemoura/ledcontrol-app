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
	$scope.relays = [
		{
			label: 'Desk',
			name: 'desk',
			state: undefined
		},
		{
			label: 'Ceiling',
			name: 'ceil',
			state: undefined
		}	
	];


	// Before entering the view
	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.relays.forEach(function(element) {
			ledService.getState(element.name).then(function(resp) {
				element.state = resp.data.state;
				console.log(element.label, element.state);
			});
		});
	});

	
	$scope.ledControl = function(relay) {
		if(relay.state) {
			ledService.turnOn(relay.name);
		} else {
			ledService.turnOff(relay.name);
		}
		$scope.led.state = !$scope.led.state;
	}

})

.controller('LedCtrl', function($scope, $stateParams, ledService) {
		
});
