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
			$scope.movies = $localstorage.getObject('movies');
		}
	};

	console.log('online', online);
	populateMovies();
	console.log('storage', $localstorage.getObject('movies'));

	$scope.doRefresh = function() {
		console.log('refreshed');
		populateMovies();
		$scope.$broadcast('scroll.refreshComplete');
	}
});
