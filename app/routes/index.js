'use strict';

var authorization = require('./middlewares/authorization');

module.exports = function(app) {
	
    // Home route
    var index = require('../controllers/index');
    app.get('/', index.render);
};