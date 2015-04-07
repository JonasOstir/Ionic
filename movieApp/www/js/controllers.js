var moviesControllers = angular.module('moviesControllers', []);

moviesControllers.controller('moviesController', ['$scope', 'Movies', function($scope, Movies) {
	$scope.$on('$ionicView.enter', function() {
		$scope.doRefresh();
	});

	$scope.doRefresh = function() {
		populateMovies().$promise.finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	var populateMovies = function() {
		Movies.query(function(data) {
			$scope.todos = data;
		});
	};

	populateMovies();


}]);
