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

const initialize = (level, style) => {
	let gameData = {};

	switch (level) {
		case '0':
			generateEasyGame(gameData, level, style);
			break;

		case '1':
			generateMediumGame(gameData, level, style);
			break;

		case '2':
			generateHardGame(gameData, level, style);
			break;

		default:
			console.log('switch default');
	}

	return gameData;
};

const generateEasyGame = (gameData, level, style) => {
	gameData.totalAttempts = TOTAL_ATTEMPTS_EASY;
	gameData.complexity = level;
	gameData.hints = TOTAL_HINTS_EASY;
	gameData.numberOfPlayers = 1;
	gameData.current = 0;
	gameData.remainedGuesses = TOTAL_GUESSES_REMAINED_EASY;
	gameData.codeLen = CODE_LEN_EASY;
	gameData.hints = TOTAL_HINTS_EASY;
	gameData.status = 'In Progress';
	gameData.style = style;
	gameData.timer = TIME;

	return gameData;
};

const generateMediumGame = (gameData, level, style) => {
	gameData.totalAttempts = TOTAL_ATTEMPTS_MEDIUM;
	gameData.complexity = level;
	gameData.hints = TOTAL_HINTS_MEDIUM;
	gameData.numberOfPlayers = 1;
	gameData.current = 0;
	gameData.remainedGuesses = TOTAL_GUESSES_REMAINED_MEDIUM;
	gameData.codeLen = CODE_LEN_MEDIUM;
	gameData.hints = TOTAL_HINTS_MEDIUM;
	gameData.style = style;
	gameData.timer = TIME;

	return gameData;
};

const generateHardGame = (gameData, level, style) => {
	gameData.totalAttempts = TOTAL_ATTEMPTS_HARD;
	gameData.complexity = level;
	gameData.hints = TOTAL_HINTS_HARD;
	gameData.numberOfPlayers = 1;
	gameData.current = 0;
	gameData.remainedGuesses = TOTAL_GUESSES_REMAINED_HARD;
	gameData.codeLen = CODE_LEN_HARD;
	gameData.hints = TOTAL_HINTS_HARD;
	gameData.status = 'In Progress';
	gameData.style = style;
	gameData.timer = TIME;

	return gameData;
};

module.exports = initialize;
