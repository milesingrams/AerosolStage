'use strict';

angular.module('aerosol.filters')
	.filter('simpleDate', ['$filter',
		function ($filter) {
			return function(input) {
				var date = new Date(input);
				var now = new Date();

				if (date.getFullYear() < now.getFullYear()) {
					return $filter('date')(date, 'shortDate')
				} else 
				if (date.getMonth() === now.getMonth()) {
					if (date.getDate() === now.getDate()) {
						return $filter('date')(date, 'shortTime');
					} else {
						return $filter('date')(date, 'MMM d');
					}
				}
			};
		}]);