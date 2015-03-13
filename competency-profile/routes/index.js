var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var isAuthenticated = require('../config/auth');
var url = require('url');

/* GET home page. */
router.get('/', isAuthenticated, function (req, res) {
	res.render('index');
});

/* GET home page. */
router.get('/profileReport', isAuthenticated, function (req, res) {
	res.render('profileReport');
});

router.get('/level', isAuthenticated, function (req, res) {
	res.render('level');
});

router.get('/objective', isAuthenticated, function (req, res) {
	res.render('objective');
});

router.get('/login', function (req, res) {
	if (req.query.redirectUrl) {
		req.session.redirectUrl = req.query.redirectUrl;
	}
	res.render('login', {
		messages: req.flash('error')
	});
});

router.post('/login', function (req, res, next) {
	passport.authenticate('obslocal', function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect('/login');
		}
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			if (req.session.redirectUrl) {
				var newUrl = url.parse(req.session.redirectUrl);

				delete req.session.redirectUrl;
				return res.redirect(newUrl.href);
			}
			if (user.directReports.length > 0) {
				res.redirect('/#/rankings');
			}
			return res.redirect('/');
		});
	})(req, res, next);
});

/* Handle Logout */
router.get('/logoff', function (req, res) {
	res.locals = {};
	req.logout();
	res.redirect('/login');
});

module.exports = router;
