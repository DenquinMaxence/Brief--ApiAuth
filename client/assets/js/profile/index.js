const tokenAuth = localStorage.getItem('tokenAuth');
const isTokenExist = tokenAuth && tokenAuth !== '' && tokenAuth.length > 0;

if (!isTokenExist) window.location.href = '/client/';

const getUser = async () => {
	const response = await fetch('http://localhost:3500/api/v1/auth/me', {
		headers: {
			xauthorization: tokenAuth,
		},
	});

	if (response.status === 200) {
		return await response.json();
	} else {
		localStorage.removeItem('tokenAuth');
		window.location.href = '/client/';
	}
};

const dateParser = (num) => {
	return new Date(Date.parse(num))
		.toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})
		.toString();
};

async function profileData() {
	const user = await getUser();

	const profileName = document.querySelectorAll('.profile-user-name');
	const profileEmail = document.getElementById('profile-user-email');

	const profileAvatar = document.getElementById('profile-user-avatar');

	const profileBioDisplay = document.getElementById('profile-user-bio-display');

	const profileCreatedAt = document.getElementById('profile-user-created-at');
	const profileUpdatedAt = document.getElementById('profile-user-updated-at');

	if (user) {
		profileName.forEach((item) => (item.innerHTML = user.name));
		profileEmail.innerHTML = user.email;

		user.picture
			? (profileAvatar.src = `../public/uploads/profile/${user.picture}`)
			: (profileAvatar.src = '../public/uploads/profile/random-user.png');

		user.bio ? (profileBioDisplay.innerHTML = user.bio) : (profileBioDisplay.innerHTML = 'N/A');

		profileCreatedAt.innerHTML = dateParser(user.createdAt);
		profileUpdatedAt.innerHTML = dateParser(user.updatedAt);
	} else {
		localStorage.removeItem('tokenAuth');
		window.location.href = '/client/';
	}
}

profileData();
