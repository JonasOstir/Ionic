var moviesService = angular.module('moviesService', [
	'ngResource',
]);

moviesService.constant('APIURL', 'http://moviesdb.brm.us/api');

moviesService.constant('APIKEY', 'JaTQVBvA-FdfP6542-jzeTXp4R-HtSQHCHm-ckJUY9HD');

moviesService.factory('Movies', function($resource, APIURL, APIKEY) {
	return $resource(APIURL + '/:id', {
		id: '@_id'
	}, {
		'get': {
			method: 'GET',
			headers: {
				'X-Api-Key': 'JaTQVBvA-FdfP6542-jzeTXp4R-HtSQHCHm-ckJUY9HD'
			}
		},
		'save': {
			method: 'POST',
			headers: {
				'X-Api-Key': 'JaTQVBvA-FdfP6542-jzeTXp4R-HtSQHCHm-ckJUY9HD'
			}
		},
		'query': {
			method: 'GET',
			isArray: true,
			headers: {
				'X-Api-Key': 'JaTQVBvA-FdfP6542-jzeTXp4R-HtSQHCHm-ckJUY9HD'
			}
		},
		'remove': {
			method: 'DELETE',
			headers: {
				'X-Api-Key': 'JaTQVBvA-FdfP6542-jzeTXp4R-HtSQHCHm-ckJUY9HD'
			}
		},
		'delete': {
			method: 'DELETE',
			headers: {
				'X-Api-Key': 'JaTQVBvA-FdfP6542-jzeTXp4R-HtSQHCHm-ckJUY9HD'
			}
		}
	});
});
