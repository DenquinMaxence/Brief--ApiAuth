const tokenAuth = localStorage.getItem('tokenAuth');
const isTokenExist = tokenAuth && tokenAuth !== '' && tokenAuth.length > 0;

if (isTokenExist) {
	const checkToken = async () => {
		const response = await fetch('http://localhost:3500/api/v1/auth/me', {
			headers: {
				'X-Authorization': tokenAuth,
			},
		});

		if (response.status === 200) {
			window.location.href = './pages/profile.html';
		} else {
			localStorage.removeItem('tokenAuth');
		}
	};

	checkToken();
}

// Interaction with signUp & signIn forms
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

[signUpButton, signInButton].forEach((button) => {
	button.addEventListener('click', () => {
		container.classList.toggle('right-panel-active');
	});
});
