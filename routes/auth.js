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
// @desc     Gets auth page
// @access   Public
router.get('/', (req, res) => {
	res.render('public/auth');
});

// @route    POST /auth/login
// @desc     Looks for the user in db and save to session
// @access   Public
router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const userId = await Users.findUserByUsername({ username });

	if (!!userId) {
		const correctCredentials = await Users.login({ username, password });
		if (!!correctCredentials) {
			Users.login({ username, password })
				.then(handleLogin(req, res))
				.catch(handleError(res, '/'));
		} else {
			res.redirect('/');
		}
	} else {
		res.redirect('/');
	}
});

// @route    POST /auth/register
// @desc     Saves a new user to db and logs in
// @access   Public
router.post('/register', async (req, res) => {
	const { username, password } = req.body;

	const userId = await Users.findUserByUsername({ username });

	if (userId === null) {
		Users.register({ username, password })
			.then(handleLogin(req, res))
			.catch(handleError(res, '/'));
	} else {
		res.redirect('/');
	}
});

// @route    POST /auth/logout
// @desc     Destroys current session
// @access   Public
router.post('/logout', (req, res) => {
	req.session.destroy((_error) => {
		res.redirect('/');
	});
});

module.exports = router;
