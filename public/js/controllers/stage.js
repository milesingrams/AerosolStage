'use strict';

angular.module('aerosol.controllers')
	.controller('StageController', ['$scope', 'Global',
		function ($scope, Global) {
			$scope.global = Global;
		}]);