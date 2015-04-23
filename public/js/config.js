'use strict';

//Setting up route
angular.module('aerosol').config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		// For unmatched routes:
		$urlRouterProvider.otherwise('/');
				
		// states for my app
		$stateProvider
		.state('stage', {
			url: '/',
			templateUrl: 'views/stage/stage.html'
		});
	}
]);

//Setting HTML5 Location Mode
angular.module('aerosol').config(['$locationProvider',
	function ($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);