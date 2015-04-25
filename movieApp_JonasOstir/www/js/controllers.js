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


moviesControllers.controller('IntroCtrl', function($scope, $state, Api, $ionicPopup, $localstorage) {

	var online = navigator.onLine;
	$scope.genreClickedClass = false;

	if (online) {
		var fetchGenres = function() {
			Api.Genres.get(function(data) {
				$localstorage.setObject('genres', data);
				$scope.genres = $localstorage.getObject('genres');
			});
		};

		fetchGenres();


		// here we store wizard data
		$scope.wizard = {};

		function persistWizardData() {
			// set flag to indicate wizard has been run
			$localStorage.myAppRun = true;

			// save additional data
			$localStorage.myAppData = {
				something: $scope.wizard.something,
				someOtherData: 'test data'
			};
		}

		$scope.start = function() {
			// save whatever data we need and then redirect to main app
			persistWizardData();

			$state.go('app.movies');
		};

		$scope.$on('wizard:StepFailed', function(e, args) {
			if (args.index == 1) {
				$ionicPopup.alert({
					title: 'Empty field',
					template: 'Please enter a value!'
				}).then(function(res) {
					console.log('Field is empty');
				});
			}
		});

		console.log('online here');
	} else {
		$ionicPopup.alert({
			title: 'You are offline',
			template: '<p>Put your device online!</p>'
		}).then(function(res) {
			ionic.Platform.exitApp()
			console.log('Field is empty');
		});
	}
});
