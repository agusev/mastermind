const initialize = require('./initialize');
const updateMoveResult = require('./feedback');
const checkGameStatus = require('./checkGameStatus');
const getCode = require('./getCode');
const getCurrentHintDigit = require('./hints');

module.exports = {
	initialize,
	updateMoveResult,
	checkGameStatus,
	getCode,
	getCurrentHintDigit,
};
