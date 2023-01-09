const constants = require('../config/constants');
const { TOTAL_HINTS_EASY, TOTAL_HINTS_MEDIUM, TOTAL_HINTS_HARD } = constants;

const getCurrentHintDigit = (code, hintArr, level) => {
	let lev = -1;
	let result;
	let codeArr = Array.from(String(code), Number);
	let codeArrUnique = codeArr.filter((v, i, a) => a.indexOf(v) === i);

	if (level === '0') {
		lev = TOTAL_HINTS_EASY;
	} else if (level === '1') {
		lev = TOTAL_HINTS_MEDIUM;
	} else if (level === '2') {
		lev = TOTAL_HINTS_HARD;
	}

	if (codeArrUnique.length >= lev) {
		result = codeArr[Math.floor(Math.random() * codeArrUnique.length)];

		while (hintArr.includes(result.toString())) {
			result = codeArr[Math.floor(Math.random() * 4)];
		}
	} else {
		result = -1;
	}

	return result;
};

module.exports = getCurrentHintDigit;
