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
	ARRAY_OF_DIGITS,
	ARRAY_OF_EMOJI_SMILES,
	ARRAY_OF_EMOJI_ANIMALS,
	ARRAY_OF_EMOJI_FRUITS,
	ARRAY_OF_EMOJI_PLANTS,
	ARRAY_OF_EMOJI_COUNTRIES,
	ARRAY_OF_NOTES,
} = constants;

const initialize = (level, style) => {
	let gameData = {};

	gameData.complexity = level;
	gameData.numberOfPlayers = 1;
	gameData.current = 0;
	gameData.status = 'In Progress';
	gameData.style = style;
	gameData.array = getArrayOfEmojii(style);
	gameData.date = new Date(Date.now()).getTime();

	switch (level) {
		case '0':
			gameData.totalAttempts = TOTAL_ATTEMPTS_EASY;
			gameData.hints = TOTAL_HINTS_EASY;
			gameData.remainedGuesses = TOTAL_GUESSES_REMAINED_EASY;
			gameData.codeLen = CODE_LEN_EASY;
			gameData.hints = TOTAL_HINTS_EASY;
			break;

		case '1':
			gameData.totalAttempts = TOTAL_ATTEMPTS_MEDIUM;
			gameData.hints = TOTAL_HINTS_MEDIUM;
			gameData.remainedGuesses = TOTAL_GUESSES_REMAINED_MEDIUM;
			gameData.codeLen = CODE_LEN_MEDIUM;
			gameData.hints = TOTAL_HINTS_MEDIUM;
			break;

		case '2':
			gameData.totalAttempts = TOTAL_ATTEMPTS_HARD;
			gameData.hints = TOTAL_HINTS_HARD;
			gameData.remainedGuesses = TOTAL_GUESSES_REMAINED_HARD;
			gameData.codeLen = CODE_LEN_HARD;
			gameData.hints = TOTAL_HINTS_HARD;
			break;

		default:
			console.log("Level doesn't exist...");
	}

	return gameData;
};

const getArrayOfEmojii = (style) => {
	let retArr = [];

	switch (style) {
		case '1':
			retArr = ARRAY_OF_EMOJI_SMILES;
			break;
		case '2':
			retArr = ARRAY_OF_EMOJI_ANIMALS;
			break;
		case '3':
			retArr = ARRAY_OF_EMOJI_FRUITS;
			break;
		case '4':
			retArr = ARRAY_OF_EMOJI_PLANTS;
			break;
		case '5':
			retArr = ARRAY_OF_EMOJI_COUNTRIES;
			break;
		case '6':
			retArr = ARRAY_OF_NOTES;
			break;

		default:
			retArr = ARRAY_OF_DIGITS;
	}

	return retArr;
};

module.exports = initialize;
