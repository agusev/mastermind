const loginForm = document.querySelector('#auth-login-form');
const chooseForm = document.querySelector('#choose-form');
const timerEl = document.querySelector('#timer');
let time;

if (timerEl) {
	time = timerEl.innerHTML;
}

if (loginForm) {
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData(loginForm);
		const values = [...formData.values()];

		if (values[0] === '' || values[0] === '') {
			alert('incorrect input!!!');
		} else {
			loginForm.submit(values);
		}
	});
}

if (chooseForm) {
	chooseForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData(chooseForm);
		const values = [...formData.values()];

		if (values.length === 4) {
			chooseForm.submit(values);
			values = [];
		} else {
			console.log('not enough arguments!');
		}
	});
}

if (timerEl) {
	let t = Math.floor((Date.now() - time) / 1000);
	let seconds = Math.ceil((t % (60 * 60)) % 60);
	let minutes = Math.floor((t % (60 * 60)) / 60);
	seconds = seconds < 10 ? '0' + seconds : seconds;
	minutes = minutes < 10 ? '0' + minutes : minutes;

	timerEl.innerHTML = minutes + ':' + seconds;
	timer();
}

function timer() {
	setTimeout(function () {
		let t = Math.floor((Date.now() - time) / 1000);
		let seconds = Math.ceil((t % (60 * 60)) % 60);
		let minutes = Math.floor((t % (60 * 60)) / 60);

		seconds = seconds < 10 ? '0' + seconds : seconds;
		minutes = minutes < 10 ? '0' + minutes : minutes;

		timerEl.innerHTML = minutes + ':' + seconds;
		timer();
	}, 1000);
}
