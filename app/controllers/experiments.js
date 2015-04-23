'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Experiment = mongoose.model('Experiment'),
    _ = require('lodash');


/**
 * Find a experiment by id
 */
exports.experiment = function(req, res, next, id) {
    Experiment.load(id, function(err, experiment) {
        if (err) return next(err);
        if (!experiment) return next(new Error('Failed to load experiment ' + id));
        req.experiment = experiment;
        next();
    });
};

/**
 * Create a experiment
 */
exports.create = function (req, res) {
    var experiment = new Experiment(req.body);

    experiment.save(function (err) {
        res.jsonp(experiment);
    });
};

/**
 * Update a experiment
 */
exports.update = function (req, res) {
    var experiment = req.experiment;

    experiment = _.extend(experiment, req.body);

    experiment.save(function (err) {
        res.jsonp(experiment);
    });
};

/**
 * Delete a experiment
 */
exports.destroy = function (req, res) {
    var experiment = req.experiment;

    experiment.remove(function (err) {
        res.jsonp(experiment);
    });
};

/**
 * Show a experiment
 */
exports.show = function (req, res) {
    var experiment = req.experiment;
    
    res.jsonp(experiment);
};

/**
 * List of Experiments
 */
exports.all = function(req, res) {
    
    if (req.query.start || req.query.end) {
        req.query.created = {};
        if (req.query.start) {
            req.query.created.$gte = req.query.start;
            delete req.query.start;
        }
        if (req.query.end) {
            req.query.created.$lte = req.query.end;
            delete req.query.end;
        }
    }

    Experiment.find(req.query).sort('-created').exec(function (err, experiments) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(experiments);
        }
    });
};
