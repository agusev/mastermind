const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const Games = require('../controllers/games');

chai.use(chaiHttp);

const gameData = {
	username: 'test',
	totalAttempts: '7',
	remainedGuesses: '1',
	status: 'Lost',
	complexity: 1,
};

// tests games db
describe('Games DB', function () {
	// saves a game to Games table
	let savedGame;
	let match = -1;
	describe('saveGame', function () {
		it('should save a game', async function () {
			savedGame = await Games.saveGame({ gameData });
			assert(savedGame.id >= 0);
		});
	});

	// retrives at least one game
	describe('retrieveGames', function () {
		it('should return a list of saved games', async function () {
			const gameList = await Games.retrieveGame();
			gameList.forEach((game) => {
				if (game.id == savedGame.id) {
					match = game.id;
				}
			});
			assert(match >= 0);
		});
	});
});
