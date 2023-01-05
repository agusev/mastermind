const constants = require('../config/constants');

const updateMoveResult = (input, feedbackArr, gameData) => {
	let codeArr = Array.from(String(gameData.code), Number);
	let inputArr = Array.from(String(input), Number);

	const currentFeedbackExactMatch = checkExactMatch(inputArr, codeArr);
	const currentFeedbackOtherMatch = checkOtherMatch(inputArr, codeArr);

	if (currentFeedbackExactMatch == 0 && currentFeedbackOtherMatch == 0) {
		feedbackArr[gameData.current] += 'all incorrect...';
	} else if (
		currentFeedbackExactMatch == 4 &&
		currentFeedbackOtherMatch == 4
	) {
		feedbackArr[gameData.current] += 'all correct!!!';
	} else {
		feedbackArr[gameData.current] += currentFeedbackOtherMatch;
		feedbackArr[gameData.current] +=
			currentFeedbackOtherMatch == 1
				? ' correct number and '
				: ' correct numbers and ';

		feedbackArr[gameData.current] += currentFeedbackExactMatch;
		feedbackArr[gameData.current] +=
			currentFeedbackExactMatch == 1
				? ' correct location'
				: ' correct locations';
	}

	return feedbackArr;
};

const checkExactMatch = (inputArr, codeArr) => {
	let res = 0;

	for (let i = 0; i < inputArr.length; i++) {
		if (codeArr[i] == inputArr[i]) {
			res += 1;
		}
	}

	return res;
};

const checkOtherMatch = (inputArr, codeArr) => {
	let res = 0;

	// for (let i = 0; i < inputArr.length; i++) {
	// 	if (codeArr[i] == inputArr[i]) {
	// 		codeArr[i] = -1;
	// 		inputArr[i] = -1;
	// 	}
	// }

	for (let i = 0; i < inputArr.length; i++) {
		for (let j = 0; j < codeArr.length; j++) {
			if (codeArr[j] >= 0 && inputArr[i] >= 0) {
				if (codeArr[j] == inputArr[i]) {
					res += 1;
					codeArr[j] = -1;
					inputArr[i] = -1;
				}
			}
		}
	}

	return res;
};

module.exports = updateMoveResult;
