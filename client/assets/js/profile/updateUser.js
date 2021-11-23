const updateButton = document.getElementById('user-update');

const profileNameDisplay = document.getElementById('profile-user-name-display');
const profileNameText = document.getElementById('profile-user-name-text');
const profileBioDisplay = document.getElementById('profile-user-bio-display');
const profileBioText = document.getElementById('profile-user-bio-text');
const confirmUpdate = document.getElementById('confirm-update');

let onUpdate = false;
const handleDisplay = () => {
	onUpdate = !onUpdate;

	if (onUpdate) {
		profileNameDisplay.style.display = 'none';
		profileNameText.style.display = 'block';
		profileBioDisplay.style.display = 'none';
		profileBioText.style.display = 'block';
		confirmUpdate.style.display = 'block';

		profileNameText.value = profileNameDisplay.innerHTML;
		profileBioText.innerHTML =
			profileBioDisplay.innerHTML !== 'N/A' ? profileBioDisplay.innerHTML : '';
	} else {
		profileNameDisplay.style.display = 'block';
		profileNameText.style.display = 'none';
		profileBioDisplay.style.display = 'block';
		profileBioText.style.display = 'none';
		confirmUpdate.style.display = 'none';

		profileNameDisplay.innerHTML = profileNameText.value;
		document.getElementById('user-name-title').innerHTML = profileNameText.value;
		profileBioDisplay.innerHTML = profileBioText.value !== '' ? profileBioText.value : 'N/A';
	}
};

updateButton.addEventListener('click', (e) => {
	e.preventDefault();

	updateButton.style.display = 'none';
	handleDisplay();
});

confirmUpdate.addEventListener('click', async () => {
	const name = profileNameText.value;
	const bio = profileBioText.value;

	const response = await fetch('http://localhost:3500/api/v1/users/', {
		method: 'PUT',
		body: JSON.stringify({
			name,
			bio,
		}),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			xauthorization: tokenAuth,
		},
	});

	if (response.status === 200) {
		alert('Vos données ont correctement était mis à jour');
	} else {
		alert('Une erreur est survenue lors de la modification de vos données');
	}

	updateButton.style.display = 'block';
	handleDisplay();
});
