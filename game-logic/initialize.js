const constants = require('../config/constants');
const {
	TOTAL_ATTEMPTS_EASY,
	TOTAL_HINTS_EASY,
	TOTAL_GUESSES_REMAINED_EASY,
	CODE_LEN_EASY,
	TOTAL_ATTEMPTS_MEDIUM,
	TOTAL_HINTS_MEDIUM,
	TOTAL_GUESSES_REMAINED_MEDIUM,
	CODE_LEN_MEDIUM,

	TOTAL_ATTEMPTS_HARD,
	TOTAL_HINTS_HARD,
	TOTAL_GUESSES_REMAINED_HARD,
	CODE_LEN_HARD,
	TIME,
} = constants;

const initialize = (level) => {
	let gameData = {};

	switch (level) {
		case '0':
			generateEasyGame(gameData, level);
			break;

		case '1':
			generateMediumGame(gameData, level);
			break;

		case '2':
			generateHardGame(gameData, level);
			break;

		default:
			console.log('switch default');
	}

	return gameData;
};

const generateEasyGame = (gameData, level) => {
	gameData.totalAttempts = TOTAL_ATTEMPTS_EASY;
	gameData.complexity = level;
	gameData.hints = TOTAL_HINTS_EASY;
	gameData.numberOfPlayers = 1;
	gameData.current = 0;
	gameData.remainedGuesses = TOTAL_GUESSES_REMAINED_EASY;
	gameData.codeLen = CODE_LEN_EASY;
	gameData.hints = TOTAL_HINTS_EASY;
	gameData.status = 'In Progress';
	gameData.timer = TIME;

	return gameData;
};

const generateMediumGame = (gameData, level) => {
	gameData.totalAttempts = TOTAL_ATTEMPTS_MEDIUM;
	gameData.complexity = level;
	gameData.hints = TOTAL_HINTS_MEDIUM;
	gameData.numberOfPlayers = 1;
	gameData.current = 0;
	gameData.remainedGuesses = TOTAL_GUESSES_REMAINED_MEDIUM;
	gameData.codeLen = CODE_LEN_MEDIUM;
	gameData.hints = TOTAL_HINTS_MEDIUM;
	gameData.status = 'In Progress';
	gameData.timer = TIME;

	return gameData;
};

const generateHardGame = (gameData, level) => {
	gameData.totalAttempts = TOTAL_ATTEMPTS_HARD;
	gameData.complexity = level;
	gameData.hints = TOTAL_HINTS_HARD;
	gameData.numberOfPlayers = 1;
	gameData.current = 0;
	gameData.remainedGuesses = TOTAL_GUESSES_REMAINED_HARD;
	gameData.codeLen = CODE_LEN_HARD;
	gameData.hints = TOTAL_HINTS_HARD;
	gameData.status = 'In Progress';
	gameData.timer = TIME;

	return gameData;
};

module.exports = initialize;
