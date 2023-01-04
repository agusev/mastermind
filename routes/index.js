const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	const { username, games } = req.session;

	res.render('private/index', { username });
});

module.exports = router;
