const signInForm = document.getElementById('signInForm');

signInForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const formData = new FormData(signInForm);
	const user = {};

	formData.forEach((value, key) => {
		user[key] = value;
	});

	signIn(user);

	signInForm.reset();
});

const signIn = async (user) => {
	const response = await fetch('http://localhost:3500/api/v1/auth/login', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});

	if (response.status === 200) {
		localStorage.setItem('tokenAuth', await response.text());
		alert('Connexion réussi avec succès, vous allez être redirigé sur votre profil');
		window.location.href = './pages/profile.html';
	} else {
		alert((await response.text()).valueOf());
	}
};
