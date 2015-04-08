var moviesControllers = angular.module('moviesControllers', []);

moviesControllers.controller('moviesController', ['$scope', 'Api', function($scope, Api) {
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
			$scope.movies = data;
		});
	};

	populateMovies();


}]);
