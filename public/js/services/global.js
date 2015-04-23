'use strict';

//Global service for global variables
angular.module('aerosol.services')
	.factory('Global', ['$resource', '$timeout', '$modal',
		function ($resource, $timeout, $modal) {

			var obj = {};

			obj.user = window.user;
			obj.authenticated = !! window.user;

			// Show a modal that says server is down
			obj.showServerError = function (err) {
				// Inline template to allow it to show even when server is down
				$modal.open({
					template: '<div class="modal-header"><h3 class="text-center">'+err.statusText+'</h3></div><div class="modal-body"><button type="submit" class="btn btn-lg btn-danger btn-block" ng-click="dismiss()">Dismiss</button></div>',
					controller: function ($scope, $modalInstance) {
						$scope.dismiss = function() {
							$modalInstance.close();
						};
					}
				});
				obj.log('server error', 'danger');
			};

			return obj;
		}]);