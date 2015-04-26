var peopleControllers = angular.module('peopleControllers', []);

peopleControllers.controller('peopleController', function($scope, Api) {
	// $scope.person = person;
	console.log('peopleController');

	Api.People.get(function(data) {
		people = data.content;
		$localstorage.setObject('people', people.people);
		$scope.people = $localstorage.getObject('people');
		$ionicLoading.hide();
	});
});

peopleControllers.controller('personController', function($scope, Api, person) {
	console.log('peopleController');
	$scope.person = person;
});


// moviesControllers.controller('peopleController', function($scope, Api, $localstorage, $localStorage, person, $stateParams, $ionicLoading, $ionicPopup, $state) {
// 	console.log('people controller');
// });


// moviesControllers.controller('personController', function($scope, $state, Api, $localstorage, person, Api) {
// 	console.log('personcontroller');
// });
