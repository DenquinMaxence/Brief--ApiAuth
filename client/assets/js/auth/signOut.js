const logoutButton = document.getElementById('user-logout');

logoutButton.addEventListener('click', async () => {
	const response = await fetch('http://localhost:3500/api/v1/auth/logout');
	if (response.status === 200) {
        localStorage.removeItem('tokenAuth');
        window.location.href = '/client/';
    }
});
