const express = require('express');
const Users = require('../controllers/users');

const router = express.Router();

const handleLogin =
	(req, res) =>
	({ id, username }) => {
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
router.get('/', (_req, res) => {
	res.render('public/auth');
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;

	Users.login({ username, password })
		.then(handleLogin(req, res))
		.catch(handleError(res, '/'));
});

router.post('/register', (req, res) => {
	const { username, password } = req.body;

	Users.register({ username, password })
		.then(res.redirect('/'))
		.catch(handleError(res, '/'));
	// TODO log in user after registration
	// .then(handleLogin(req, res))
	// .catch(handleError(res, '/'));
});

router.post('/logout', (req, res) => {
	req.session.destroy((_error) => {
		res.redirect('/');
	});
});

module.exports = router;
