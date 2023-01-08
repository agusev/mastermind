const loginForm = document.querySelector('#auth-login-form');

if (loginForm) {
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData(loginForm);
		const values = [...formData.values()];
		console.log(values[0] == '');
		if (values[0] === '' || values[0] === '') {
			alert('incorrect input!!!');
		} else {
			loginForm.submit(values);
		}
	});
}
