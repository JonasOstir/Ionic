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


	var populateMovies = function() {
		Api.Movies.get(function(data) {
			$localstorage.setObject('movies', data);
			$scope.movies = $localstorage.getObject('movies');
		});
	};

	populateMovies();
	console.log($localstorage.getObject('movies'));

});
