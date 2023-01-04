const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('private/game');
});

router.post('/start', async (req, res) => {
	res.redirect('/game');
});

module.exports = router;
