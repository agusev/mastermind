const express = require('express');
const Users = require('../controllers/users');

const router = express.Router();

// stores user information in session
const handleLogin = (req, res) => {
	const { id, username } = req.body;

	req.session.authenticated = true;
	req.session.userId = id;
	req.session.username = username;
	req.session.games = [];

	res.redirect('/');
};

const handleError = (res, redirectUri) => (error) => {
	console.log({ error });
	res.redirect(redirectUri);
};

// Routes

// @route    GET /auth
// @desc     Get auth page
// @access   Public
router.get('/', (req, res) => {
	res.render('public/auth');
});

// @route    POST /auth/login
// @desc     Post login info
// @access   Public
router.post('/login', (req, res) => {
	const { username, password } = req.body;

	Users.login({ username, password })
		.then(handleLogin(req, res))
		.catch(handleError(res, '/'));
});

// @route    POST /auth/register
// @desc     Post register info
// @access   Public
router.post('/register', (req, res) => {
	const { username, password } = req.body;

	Users.register({ username, password })
		.then(handleLogin(req, res))
		.catch(handleError(res, '/'));
});

// @route    POST /auth/logout
// @desc     Post destroys current session
// @access   Public
router.post('/logout', (req, res) => {
	req.session.destroy((_error) => {
		res.redirect('/');
	});
});

module.exports = router;
