var moviesService = angular.module('moviesService', [
	'ngResource',
]);

moviesService.factory('Movies', function($resource) {
	return $resource(APIURL + '/:id', {
		id: '@_id'
	}, {
		update: {
			method: 'PUT'
		},
		post: {
			method: "POST",
			isArray: false,
		}
	});
});
