const db = require('./index');

const SAVE_GAME =
	'INSERT INTO games (username, total_attempts, remained_attempts, result, complexity) VALUES (${username}, ${total_attempts}, ${remained_attempts}, ${result}, ${complexity}) RETURNING id';

const RETRIEVE_GAMES = 'SELECT * FROM games ORDER BY finished_at DESC';

const saveGame = ({ gameData }) => {
	return db.one(SAVE_GAME, {
		username: gameData.username,
		total_attempts: gameData.totalAttempts,
		remained_attempts: gameData.remainedGuesses,
		result: gameData.status,
		complexity: gameData.complexity,
	});
};

const retrieveGame = () => {
	return db.any(RETRIEVE_GAMES);
};

module.exports = { saveGame, retrieveGame };
