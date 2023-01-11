const express = require('express');
const router = express.Router();
const Games = require('../controllers/games');

// @route    GET /
// @desc     Get home page
// @access   Private
router.get('/', function (req, res, next) {
	const currentPage = 'home';
	const { username, games } = req.session;

	res.status(200).render('private/index', { username, games, currentPage });
});

// @route    GET /history
// @desc     Get history page
// @access   Private
router.get('/history', async function (req, res, next) {
	const currentPage = 'history';
	const { username, games } = req.session;
	const gameList = await Games.retrieveGame().catch(handleError(res, '/'));

	res.status(200).render('private/history', {
		username,
		gameList,
		games,
		currentPage,
	});
});

const handleError = (res, redirectUri) => (err) => {
	console.log({ err });
	res.redirect(redirectUri);
};

module.exports = router;
