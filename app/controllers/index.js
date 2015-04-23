'use strict';

var config = require('../../config/config');

exports.render = function (req, res) {
	res.render('index', {
        user: req.user ? JSON.stringify({
            username: req.user.username
        }) : res.redirect('/signin')
    });
};