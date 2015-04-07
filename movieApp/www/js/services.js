var movieService = angular.module('movieService', [
	'ngResource',
]);

movieService.factory('Movies', function($resource) {
	return $resource('http://localhost:9000/todos/:id', {
		id: '@_id'
	}, {
		update: {
			method: 'PUT'
		},
		post: {
			method: "POST",
			isArray: false,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}
	});
});
