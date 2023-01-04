const express = require('express');
const router = express.Router();

// @route    GET /
// @desc     Get home page
// @access   Private
router.get('/', function (req, res, next) {
	const { username, games } = req.session;

	res.render('private/index', { username });
});

// @route    GET /history
// @desc     Get history page
// @access   Private
router.get('/history', async function (req, res, next) {
	res.render('private/history');
});

const handleError = (res, redirectUri) => (error) => {
	console.log({ error });
	res.redirect(redirectUri);
};

module.exports = router;
