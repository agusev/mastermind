const axios = require('axios');

const getCode = async () => {
	let result = '';
	let url =
		'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new';
	let code = await axios
		.get(url)
		.then((res) => {
			let code = res.data;
			code = code.split(/\n/);
			code.length -= 1;

			for (let i = 0; i < code.length; i++) {
				result += code[i];
			}

			return result;
		})
		.catch((err) => {
			console.log(err);
		});

	return code;
};

module.exports = getCode;
