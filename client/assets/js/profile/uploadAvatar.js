const uploadAvatarForm = document.getElementById('uploadAvatarForm');

uploadAvatarForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const formData = new FormData(uploadAvatarForm);
	const response = await fetch('http://localhost:3500/api/v1/users/avatar', {
		method: 'POST',
		body: formData,
	});

	console.log(response);
});
