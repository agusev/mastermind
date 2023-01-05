const checkGameStatus = (input, code, remained) => {
	if (remained == 1) {
		return 2;
	} else if (input == code) {
		return 3;
	}

	return 1;
};

module.exports = checkGameStatus;
