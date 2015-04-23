'use strict';

angular.module('aerosol.controllers')
	.controller('MainController', ['$scope', 'Global',
		function ($scope, Global) {
			$scope.global = Global;
		}]);