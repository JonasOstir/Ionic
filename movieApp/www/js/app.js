// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('movieApp', [
	'ionic',
	'ngResource',
	'moviesService',
	'moviesControllers'
]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/movies');
	// console.log('app.js', navigator.connection.type);

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
			movie: function($stateParams, Movies) {
				var m = Movies.get({
					id: $stateParams.movie
				});
				return m;
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
});
