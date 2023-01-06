const express = require('express');
const router = express.Router();
const GameLogic = require('../game-logic');
const Games = require('../controllers/games');
const constants = require('../config/constants');
const { TIME } = constants;

const handleError = (res, redirectUri) => (error) => {
	console.log({ error });
	res.redirect(redirectUri);
};

// Routes

// @route    GET /game
// @desc     Get game page page
// @access   Private
router.get('/', (req, res) => {
	// if game entity doesn't exist -> redirects to home page
	if (req.session.games.length === 0) {
		res.redirect('/');
	}
	const { username } = req.session;
	const [gameData, guessesArr, feedbackArr, hintArr] = req.session.games[0];

	res.render('private/game', {
		username,
		gameData,
		feedbackArr,
		guessesArr,
		hintArr,
	});
});

// @route    POST /game/start
// @desc     Post initiates the game
// @access   Private
router.post('/start', async (req, res) => {
	// data from the forms
	const style = Object.values(req.body)[0];
	const level = Object.values(req.body)[1];
	let data = [];
	let gameData = GameLogic.initialize(level, style);

	// generates the secret code
	gameData.code = await GameLogic.getCode();

	// initiates a feedback array and populates with ''
	let feedbackArr = Array(gameData.totalAttempts).fill('');

	// initiates a guesses array and populates with -1
	let guessesArr = Array(gameData.totalAttempts)
		.fill()
		.map(() => Array(gameData.codeLen).fill(-1));

	// initiates a hints array and populates with '-'
	let hintArr = Array(gameData.totalAttempts).fill('-');

	// put all game information to the data array and save to the current session
	data[0] = gameData;
	data[1] = guessesArr;
	data[2] = feedbackArr;
	data[3] = hintArr;
	req.session.games[0] = data;

	res.redirect('/game');
});

// @route    POST /game
// @desc     Updates game data
// @access   Private
router.post('/', async (req, res) => {
	const { username, games } = req.session;
	let [gameData, guessesArr, feedbackArr, hintArr] = games[0];

	gameData.username = username;

	let input = '';

	// parses input
	Object.values(req.body).forEach((x) => {
		input += x;
	});

	// checks win conditions
	switch (
		GameLogic.checkGameStatus(
			parseInt(input),
			gameData.code,
			gameData.remainedGuesses
		)
	) {
		case 2:
			gameData.status = 'Lost';

			Games.saveGame({
				gameData,
			}).catch(handleError(res, '/'));

			break;
		case 3:
			gameData.status = 'Won';

			Games.saveGame({
				gameData,
			}).catch(handleError(res, '/'));

			break;
		default:
			gameData.status = 'In Progress';
	}

	// updates feedback array
	feedbackArr = GameLogic.updateMoveResult(input, feedbackArr, gameData);

	// puts input to guesses array
	Object.values(req.body).forEach((x, index) => {
		guessesArr[gameData.current][index] = x;
	});

	// increments
	if (gameData.current < gameData.totalAttempts) {
		gameData.current += 1;
	}

	// decrements number of remained guesses
	if (gameData.remainedGuesses > 0) {
		gameData.remainedGuesses -= 1;
	}

	res.redirect('/game');
});

// @route    POST /game/hint
// @desc     Updates hint array
// @access   Private
router.post('/hint', (req, res) => {
	const { games } = req.session;

	let [gameData, , , hintArr] = games[0];

	if (gameData.hints > 0 && hintArr[gameData.current] == '-') {
		// decriments number of hints
		gameData.hints -= 1;

		// gets a hint digit
		let currentHintDigit = GameLogic.getCurrentHintDigit(
			gameData.code,
			hintArr
		);

		// sets number of hint to 0
		// case when there are 3 or 4 equal digits (e.g. '4444' or '2122')
		if (currentHintDigit == -1 && gameData.hints > 0) {
			gameData.hints = 0;
		}

		// puts the hinted digit to the hints array
		hintArr[gameData.current] = gameData.array[currentHintDigit];
	} else {
		console.log('cannot give a hint');
	}

	res.redirect('/game');
});

// @route    POST /game/finish
// @desc     Deletes game data from session
// @access   Private
router.post('/finish', (req, res) => {
	// deletes data array from session
	req.session.games = [];

	res.redirect('/');
});

module.exports = router;
