var moviesControllers = angular.module('moviesControllers', []);

moviesControllers.controller('moviesController', ['$scope', 'Movies', function($scope, Movies) {
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
		Movies.get(function(data) {
			$scope.movies = data;
		});
	};

	populateMovies();


}]);
