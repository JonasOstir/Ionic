// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('movieApp_JonasOstir', [
	'ionic',
	'ngResource',
	'moviesService',
	'moviesControllers'
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
	// set default route to wizard
	var defaultRoute = '/start/intro';
	// var defaultRoute = '/movies';

	// check whether wizard has been run in order to change default route
	// we cannot inject ngStorage dependency in a config module, so we need to use plain localStorage object
	if (localStorage.getItem('ngStorage-myAppRun')) {
		console.log('wizard has been run - skip!');
		defaultRoute = '/movies';
	}

	$stateProvider.state('start', {
		abstract: true,
		url: '/start',
		template: '<ion-nav-view></ion-nav-view>'
	});

	$stateProvider.state('start.intro', {
		url: '/intro',
		templateUrl: 'templates/start.html',
		controller: 'IntroCtrl'
	});

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

	$urlRouterProvider.otherwise(defaultRoute);
});
