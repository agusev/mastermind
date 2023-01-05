const constants = require('../config/constants');
const { TOTAL_HINTS_EASY } = constants;

const getCurrentHintDigit = (code, hintArr) => {
	let result;
	let codeArr = Array.from(String(code), Number);

	let codeArrUnique = codeArr.filter((v, i, a) => a.indexOf(v) === i);

	if (codeArrUnique.length >= TOTAL_HINTS_EASY) {
		result = codeArr[Math.floor(Math.random() * codeArrUnique.length)];
		while (hintArr.includes(result)) {
			result = codeArr[Math.floor(Math.random() * 4)];
		}
	} else {
		result = -1;
	}

	return result;
};

module.exports = getCurrentHintDigit;
