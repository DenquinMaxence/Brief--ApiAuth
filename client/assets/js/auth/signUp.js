const signUpForm = document.getElementById('signUpForm');

signUpForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const formData = new FormData(signUpForm);
	const user = {};

	formData.forEach((value, key) => {
		user[key] = value;
	});

	signUp(user);

	signUpForm.reset();
});

const signUp = async (user) => {
	const response = await fetch('http://localhost:3500/api/v1/auth/register', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});

	if (response.status === 201) {
		alert('Compte crée avec succès, vous pouvez désormais vous connecter');
		// Switch to login form
		document.getElementById('container').classList.toggle('right-panel-active');
	} else {
		alert((await response.text()).valueOf());
	}
};
