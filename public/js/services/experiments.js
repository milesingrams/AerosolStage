'use strict';

//Experiments service used for experiments REST endpoint
angular.module('aerosol.services')
	.factory('ExperimentsService', ['$resource', 'Global', 
		function ($resource, Global) {

			var obj = {};
			var experimentSet = {};

			obj.experiments = [];

			obj.resource = $resource('experiments/:experimentId', {
				experimentId: '@_id'
			}, {
				update: {
					method: 'PUT'
				},
				refresh: {
					method: 'GET'
				}
			});

			obj.load = function (query, cb) {
				experimentSet = {};
				obj.resource.query(query, function (response) {
					if (response.length) {
						addToExperimentSet(response);
					} else {
						makeExperimentsArray();
					}
					cb(response);
				});
			};

			obj.findOne = function (experimentId, cb) {
				obj.resource.get({experimentId: experimentId}, function (response) {
					addToExperimentSet([response]);
					cb(response);
				}, Global.showServerError);
			};

			obj.create = function (experiment, cb) {
				var newExperiment = new obj.resource(experiment);

				newExperiment.user = Global.user;

				newExperiment.$save(function (response) {
					addToExperimentSet([response]);
					cb(response);
				}, Global.showServerError);
			};

			obj.update = function (experiment, cb) {
				experiment.$update(function (response) {
					addToExperimentSet([response]);
					cb(response);
				}, Global.showServerError);
			};

			obj.refresh = function (experiment, cb) {
				experiment.$refresh(function (response) {
					addToExperimentSet([response]);
					cb(response);
				}, Global.showServerError);
			};

			obj.destroy = function (experiment, cb) {
				experiment.$remove(function (response) {
					removeFromExperimentSet([response]);
					cb(response);
				}, Global.showServerError);
			};

			var addToExperimentSet = function (experiments) {
				angular.forEach(experiments, function (experiment) {
					experimentSet[experiment._id] = experiment;
				});
				makeExperimentsArray();
			};

			var removeFromExperimentSet = function (experiments) {
				angular.forEach(experiments, function (experiment) {
					delete experimentSet[experiment._id];
				});
				makeExperimentsArray();
			};

			var makeExperimentsArray = function () {
				obj.experiments = [];
				for (var experimentKey in experimentSet) {
					obj.experiments.push(experimentSet[experimentKey]);
				}
			};

			return obj;
		}]);