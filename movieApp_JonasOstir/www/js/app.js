// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('movieApp_JonasOstir', [
	'ionic',
	'ngResource',
	'moviesService',
	'moviesControllers',
	'peopleControllers',
	'ngStorage'
]);

app.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

app.config(function($stateProvider, $urlRouterProvider) {
	// set default route to intro
	var defaultRoute = '/start/intro';
	var storage = localStorage;

	// check whether the intro has been run in order to change default route - https://github.com/arielfaur/ionic-wizard
	// we cannot inject ngStorage dependency in a config module, so we need to use plain localStorage object
	if (storage.movieAppRun) {
		console.log('wizard has been run - skip!');
		defaultRoute = '/movies';
	}

	$stateProvider.state('start', {
		url: '/start',
		abstract: true,
		templateUrl: 'templates/start.html'
	})

	$stateProvider.state('start.intro', {
		url: '/intro',
		templateUrl: 'templates/intro.html',
		controller: 'introController'
	})

	$stateProvider.state('app', {
		abstract: true,
		templateUrl: 'templates/main.html',
	});

	$stateProvider.state('app.movies', {
		abstract: true,
		url: '/movies',
		views: {
			movies: {
				template: '<ion-nav-view></ion-nav-view>'
			}
		}
	});

	$stateProvider.state('app.movies.index', {
		url: '',
		templateUrl: 'templates/movies.html',
		controller: 'moviesController',
	});

	$stateProvider.state('app.movies.detail', {
		url: '/:movie',
		templateUrl: 'templates/movie.html',
		controller: 'movieDetailController',
		resolve: {
			genre: function($stateParams, Api) {
				var params = $stateParams.movie.split(',');
				var g = Api.Genres.get({
					id: params[2]
				});
				return g;
			},
			movie: function($stateParams, Api) {
				var params = $stateParams.movie.split(',');
				var m = Api.Movies.get({
					id: params[0]
				});
				return m;
			},
			next: function($stateParams) {
				var params = $stateParams.movie.split(',');
				return params[3]
			},
			previous: function($stateParams) {
				var params = $stateParams.movie.split(',');
				return params[1]
			}
		}
	});


	$stateProvider.state('app.people', {
		abstract: true,
		url: '/people',
		views: {
			movies: {
				template: '<ion-nav-view></ion-nav-view>'
			}
		}
	});

	$stateProvider.state('app.people.index', {
		url: '',
		templateUrl: 'templates/people.html',
		controller: 'peopleController',
	});

	$stateProvider.state('app.people.detail', {
		url: '/:person',
		templateUrl: 'templates/person.html',
		controller: 'personController',
		resolve: {
			person: function($stateParams, Api) {
				var person = Api.People.get({
					id: $stateParams.person
				});

				var movies = Api.PeopleMovies.get({
					id: $stateParams.person
				});

				console.log($stateParams, 'return movies', movies);
				console.log($stateParams, 'return person', person);
				return [person, movies];
			}
		}
	});

	$stateProvider.state('app.help', {
		url: '/help',
		views: {
			help: {
				templateUrl: 'templates/help.html'
			}
		}
	});

	$urlRouterProvider.otherwise(defaultRoute);
});
