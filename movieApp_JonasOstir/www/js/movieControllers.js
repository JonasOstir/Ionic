var moviesControllers = angular.module('moviesControllers', []);

moviesControllers.controller('moviesController', function($scope, Api, $localstorage, $localStorage, $stateParams, $ionicLoading, $ionicPopup, $state) {
	// Check the online status.
	if (navigator.onLine) {
		online = true;
	} else {
		online = false;
	}

	var test = window.localStorage;

	if (test.movieAppRun == 'undefined') {
		console.log('start');
		$state.go('start.intro');
	}

	// test = test.getObject('movieAppRun');
	// If the intro hasen't run yet, go to the intro.
	var checkedGenres = $localstorage.getObject('checkedGenres');

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
			var genres;
			var movies;

			Api.Movies.get(function(data) {
				movies = data.content;
				$localstorage.setObject('movies', movies.movies);
				$scope.movies = $localstorage.getObject('movies');
				$ionicLoading.hide();
			});

			Api.Genres.get(function(data, genres) {
				genres = data.content;
				$localstorage.setObject('genres', genres.genres);
				$scope.genres = $localstorage.getObject('genres');
				$ionicLoading.hide();
			});

			movies = $localstorage.getObject('movies');
			genres = $localstorage.getObject('genres');

			var genresLength = genres.length;
			var moviesLength = movies.length;

			var genresBetter = [];

			for (var g = 0; g < genresLength; g++) {
				genres[g].movies = [];

				for (var m = 0; m < moviesLength; m++) {
					var movie = movies[m];
					for (var gm = 0; gm < movie.genres.length; gm++) {
						var movieGenre = movie.genres[gm];
						if (movieGenre.id == genres[g].id) {
							genres[g].movies.push(movie);
						}
					}
				}
				genresBetter.push(genres[g]);
			}

			$scope.favorites = $localstorage.getObject('checkedGenres');
			$scope.genresBetter = genresBetter;
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

moviesControllers.controller('movieDetailController', function($scope, $state, Api, $ionicPopup, $localstorage, movie, genre, next, previous, $ionicHistory) {
	$scope.movie = movie;

	$scope.previousMovieId = (previous !== 'undefined' ? previous : movie.id);
	$scope.nextMovieId = (next !== 'undefined' ? next : movie.id);
	$scope.genreId = genre.id;

	$scope.goBack = function() {
		$state.go('app.movies.index');
	}

	// $scope.detail = function(actorId) {
	// 	$state.go('app.people.detail', {
	// 		'person': actorId
	// 	});
	// }
});

moviesControllers.controller('introController', function($scope, $state, Api, $ionicPopup, $localstorage) {
	// First check if user is online.
	var online = navigator.onLine;

	// If user is online.
	if (online) {

		/**
		 *	Functions
		 **/

		// Get the genres from the api.
		var fetchGenres = function() {
			Api.Genres.get(function(data) {
				genres = data.content.genres;
				buildGenres(genres);

				$scope.genres = genres;
			});
		}

		// Set all genres as false (user did not checked them yet).
		var buildGenres = function(genres) {
			var l = genres.length;
			for (var i = 0; i < l; i++) {
				genres[i].checked = false;
			}
		}

		// When user wants his genres to be saved.
		$scope.saveGenres = function() {
			checkedGenres = fillCheckedGenres();
			start(checkedGenres);
		}

		// Get genres clicked on by the user.
		var fillCheckedGenres = function() {
			var checked = [];
			var genres = $scope.genres;
			var l = genres.length;
			for (var i = 0; i < l; i++) {
				if (genres[i].checked === true) {
					checked.push(genres[i].title);
				}
			}

			if (genres.length === 0) {
				genres = 'none';
			}

			return checked;
		}

		// Persist the user's genres.
		function persistUserGenres(checked) {
			// set flag to indicate wizard has been run
			$localstorage.setObject('movieAppRun', true);

			// save additional movieAppRun
			$localstorage.setObject('checkedGenres', checked);
		}

		// Start the actual application
		var start = function(checkedGenres) {
			// Save whatever data we need and then redirect to main app
			persistUserGenres(checkedGenres);
			$state.go('app.movies.index', checkedGenres);
		};

		fetchGenres();

	} else {
		// If the user is not online, let him know.
		$ionicPopup.alert({
			title: 'You are offline',
			template: '<p>Put your device online!</p>'
		}).then(function(res) {
			ionic.Platform.exitApp()
			console.log('Field is empty');
		});
	}
});
