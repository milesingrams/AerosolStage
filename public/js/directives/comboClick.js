'use strict';

angular.module('aerosol.directives')
	.directive('comboClick', [
		function() {
			return {
				restrict: 'A',
				link: function(scope, elem, attr) {

					elem.on('click', function (event) {
						if (event.shiftKey) {
							scope.$apply(function () {
								scope.$eval(attr.shiftClick);
							});
						} else 
						if (event.ctrlKey) {
							scope.$apply(function () {
								scope.$eval(attr.ctrlClick);
							});
						} else {
							scope.$apply(function () {
								scope.$eval(attr.normalClick);
							});
						}
					});
				}
			};
		}]);