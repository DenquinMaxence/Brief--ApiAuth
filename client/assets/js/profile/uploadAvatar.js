const inputFile = document.getElementById('input-file');
inputFile.addEventListener('input', () => {
	const submitButton = document.getElementById('button-submit-file');
	submitButton.style.display = 'block';
});

const uploadAvatarForm = document.getElementById('uploadAvatarForm');
uploadAvatarForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const formData = new FormData(uploadAvatarForm);
	await fetch('http://localhost:3500/api/v1/users/upload', {
		method: 'POST',
		body: formData,
		headers: {
			xauthorization: tokenAuth,
		},
	});
});
