var moviesControllers = angular.module('moviesControllers', []);

moviesControllers.controller('moviesController', function($scope, Api, $localstorage, $ionicLoading, $ionicPopup) {
	if (navigator.onLine) {
		online = true;
	} else {
		online = false;
	}

	// Setup the loader
	$scope.$on('$ionicView.beforeEnter', function() {
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
		populateMovies();
	});

	var populateMovies = function() {
		if (online) {
			Api.Movies.get(function(data) {
				$localstorage.setObject('movies', data);
				$scope.movies = $localstorage.getObject('movies');
				$ionicLoading.hide();
			});
		} else {
			alert('Movies fetched from offline storage!');
			$scope.movies = $localstorage.getObject('movies');
			$ionicLoading.hide();
		}
	};

	populateMovies();

	$scope.doRefresh = function() {
		populateMovies();
		$scope.$broadcast('scroll.refreshComplete');
	}
});
