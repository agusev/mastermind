const express = require('express');
const router = express.Router();
const Games = require('../controllers/games');

// @route    GET /
// @desc     Get home page
// @access   Private
router.get('/', function (req, res, next) {
	if (req.session.games.length > 0) {
		res.redirect('/game');
	}

	const { username, games } = req.session;

	res.render('private/index', { username });
});

// @route    GET /history
// @desc     Get history page
// @access   Private
router.get('/history', async function (req, res, next) {
	const { username } = req.session;
	const gameList = await Games.retrieveGame().catch(handleError(res, '/'));

	res.render('private/history', { username, gameList });
});

const handleError = (res, redirectUri) => (error) => {
	console.log({ error });
	res.redirect(redirectUri);
};

module.exports = router;
