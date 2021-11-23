const logoutButton = document.getElementById('user-logout');

logoutButton.addEventListener('click', async (e) => {
	e.preventDefault();
	const response = await fetch('http://localhost:3500/api/v1/auth/logout', {
		headers: {
			xauthorization: tokenAuth,
		},
	});
	if (response.status === 200) {
		localStorage.removeItem('tokenAuth');
		window.location.href = '/client/';
	}
});
