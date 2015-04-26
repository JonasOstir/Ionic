var peopleControllers = angular.module('peopleControllers', []);

peopleControllers.controller('peopleController', function($scope, Api, person, $localstorage) {
	// $scope.person = person;
	console.log('peopleController');

	Api.People.get(function(data) {
		people = data.content;
		$localstorage.setObject('people', people.people);
		$scope.people = $localstorage.getObject('people');
		$ionicLoading.hide();
	});
});

peopleControllers.controller('personController', function($scope, person, Api, $localstorage) {
	console.log('peopleController');
	$scope.person = person;

	$scope.goBack = function() {
		window.history.back();
	}
});
