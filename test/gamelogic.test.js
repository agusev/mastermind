const assert = require('assert');
const { expect } = require('chai');

const GameLogic = require('../game-logic');
const constants = require('../config/constants');
const {
	TOTAL_ATTEMPTS_EASY,
	TOTAL_HINTS_EASY,
	TOTAL_GUESSES_REMAINED_EASY,
	CODE_LEN_EASY,
} = constants;

// tests game logic
describe('GAME LOGIC', function () {
	describe('initiate.js', function () {
		it('should initiate an easy game', () => {
			const level = '0';
			const gameData = GameLogic.initialize(level);

			assert(gameData.totalAttempts === TOTAL_ATTEMPTS_EASY);
			assert(gameData.complexity === level);
			assert(gameData.hints === TOTAL_HINTS_EASY);
			assert(gameData.codeLen === CODE_LEN_EASY);
		});
	});

	describe('getCode.js', function () {
		it('should send a secret code', async () => {
			const code = await GameLogic.getCode();
			assert(code.length === CODE_LEN_EASY);
		});
	});

	describe('checkGameStatus.js', function () {
		it('should return correct game status', () => {
			const statusWin = GameLogic.checkGameStatus('1234', '1234', 5);
			const statusLost = GameLogic.checkGameStatus('1234', '4321', 1);
			const statusOther = GameLogic.checkGameStatus('1234', '4321', 3);

			assert(statusWin === 3);
			assert(statusLost === 2);
			assert(statusOther === 1);
		});
	});

	describe('feedback.js', function () {
		it('should return correct feedback array', () => {
			let gameData1 = {
				current: 1,
				code: '1234',
				style: '0',
			};

			let gameData2 = {
				current: 1,
				code: '1234',
				style: '1',
			};

			let feedbackArr1 = ['', '', '', '', '', '', ''];
			let feedbackArr2 = ['', '', '', '', '', '', ''];
			let feedbackArr3 = ['', '', '', '', '', '', ''];
			let feedbackArr4 = ['', '', '', '', '', '', ''];

			const input1 = '1234';
			const input2 = '4321';
			const input3 = '5678';

			const result1 = GameLogic.updateMoveResult(
				input1,
				feedbackArr1,
				gameData1
			);

			const result2 = GameLogic.updateMoveResult(
				input2,
				feedbackArr2,
				gameData1
			);

			const result3 = GameLogic.updateMoveResult(
				input3,
				feedbackArr3,
				gameData1
			);

			const result4 = GameLogic.updateMoveResult(
				input2,
				feedbackArr4,
				gameData2
			);

			assert(result1[gameData1.current] === 'all correct!!!');

			assert(
				result2[gameData1.current] ===
					'4 correct numbers and 0 correct locations'
			);

			assert(result3[gameData1.current] === 'all incorrect...');

			assert(
				result4[gameData2.current] ===
					'4 correct emoji and 0 correct locations'
			);
		});
	});

	describe('hints.js', function () {
		it('should return correct hint digit', () => {
			const code1 = '1234';
			const level = '0';
			let hintArr1 = ['1', '2', '4', '-', '-', '-', '-', '-', '-', '-'];
			const result1 = GameLogic.getCurrentHintDigit(
				code1,
				hintArr1,
				level
			);

			assert(result1 === 3);
		});
	});
});
