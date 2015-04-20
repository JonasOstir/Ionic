var moviesControllers = angular.module('moviesControllers', []);

moviesControllers.controller('moviesController', function($scope, Api, $localstorage, $ionicLoading) {

	// $scope.$on('$ionicView.enter', function() {

	// $scope.doRefresh();
	// populateMovies();
	// });

	// $scope.doRefresh = function() {
	// 	populateMovies().$promise.finally(function() {
	// 		$scope.$broadcast('scroll.refreshComplete');
	// 	});
	// };

	// Setup the loader
	$scope.$on('$ionicView.beforeEnter', function() {
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
	});




	var populateMovies = function() {
		Api.Movies.get(function(data) {
			$localstorage.setObject('movies', data);
			$scope.movies = $localstorage.getObject('movies');
			$ionicLoading.hide();
		});
	};

	populateMovies();
	console.log($localstorage.getObject('movies'));

});
