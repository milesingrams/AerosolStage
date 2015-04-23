'use strict';

angular.module('aerosol.directives')
	.directive('filterBar', ['$timeout', 
		function ($timeout) {
			return {
				restrict: 'A',
				scope: {
					inputmodel: '=',
					prefixes: '='
				},
				templateUrl: 'views/directives/filter-bar.html',
				link: function (scope, elem, attr) {

					scope.$watch('inputmodel', function () {
						scope.suffix = scope.inputmodel;
					});


					scope.dropdownOpen = false;
					scope.suffix = '';
					scope.prefix = '';
					var filterTimeout;

					if (attr.placeholder) {
						scope.placeholder = attr.placeholder;
					} else {
						scope.placeholder = 'Search';
					}

					if (attr.onReturn) {
						scope.onReturn = attr.onReturn;
					}

					if (attr.onPrefixChange) {
						scope.onPrefixChange = attr.onPrefixChange;
					}

					// When filtertext changes set a delay until it applies filter
					scope.updateSuffix = function () {
						if (filterTimeout) {
							$timeout.cancel(filterTimeout);
						}
						filterTimeout = $timeout(function() {
							scope.inputmodel = filterString();
						}, 250);
					};

					scope.setPrefix = function (pre) {
						scope.prefix = pre;
						scope.inputmodel = filterString();
						if (scope.onPrefixChange) {
							scope.onPrefixChange(pre);
						}
						scope.dropdownOpen = false;
					};

					scope.return = function () {
						scope.inputmodel = filterString();
						if (scope.onReturn) {
							scope.onReturn(scope.inputmodel);
						}
					};

					var filterString = function () {
						var operator = '';

						if (scope.prefix) {
							operator = ' = ';
						}
						return scope.prefix+operator+scope.suffix;
					};
				}
			};
		}]);