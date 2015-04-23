'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');


/**
 * Experiment Schema
 */
var ExperimentSchema = new Schema({
    name: {
        type: String,
        default: '',
        index: 'text'
    },
    tags: {
        type: Array,
        default: [],
        index: true
    },
    created: {
        type: Date,
        default: Date.now,
        index: true
    },
    modified: {
        type: Date,
        default: Date.now
    }
}, {minimize: false});

/**
 * Statics
 */
ExperimentSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

ExperimentSchema.plugin(autoIncrement.plugin, 'Experiment');
mongoose.model('Experiment', ExperimentSchema);
