var moviesService = angular.module('moviesService', [
	'ngResource',
]);

moviesService.constant('APIURL', 'http://moviesdb.brm.us/api');

moviesService.constant('APIKEY', 'JaTQVBvA-FdfP6542-jzeTXp4R-HtSQHCHm-ckJUY9HD');

moviesService.factory('Api', function($resource, APIURL, APIKEY) {
	console.log("request done");
	return {
		Movies: $resource(APIURL + '/movies/:id', {
			id: '@_id'
		}, {
			'get': {
				method: 'GET',
				headers: {
					'X-Api-Key': 'JaTQVBvA-FdfP6542-jzeTXp4R-HtSQHCHm-ckJUY9HD',
					'Content-Type': 'application/json'
				},
				cache: true,
				isArray: false
			}
		}),
		Genres: $resource(APIURL + '/genres/:id', {
			id: '@_id'
		}, {
			'get': {
				method: 'GET',
				headers: {
					'X-Api-Key': 'JaTQVBvA-FdfP6542-jzeTXp4R-HtSQHCHm-ckJUY9HD',
					'Content-Type': 'application/json'
				},
				cache: true,
				isArray: false
			}
		}),
		People: $resource(APIURL + '/people/:id', {
			id: '@_id'
		}, {
			'get': {
				method: 'GET',
				headers: {
					'X-Api-Key': 'JaTQVBvA-FdfP6542-jzeTXp4R-HtSQHCHm-ckJUY9HD',
					'Content-Type': 'application/json'
				},
				cache: true,
				isArray: false
			}
		})
	};
});

// source: http://learn.ionicframework.com/formulas/localstorage/
moviesService.factory('$localstorage', ['$window', function($window) {
	return {
		set: function(key, value) {
			$window.localStorage[key] = value;
		},
		get: function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		setObject: function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key) {
			return JSON.parse($window.localStorage[key] || '{}');
		}
	};
}]);
