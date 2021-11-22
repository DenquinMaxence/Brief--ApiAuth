const changePasswordButton = document.getElementById('changePasswordButton');
const deleteAccountButton = document.getElementById('deleteAccountButton');

[changePasswordButton, deleteAccountButton].forEach((button) => {
	button.addEventListener('click', (event) => {
		const modalContent = document.querySelector('.modal-content');
		let html;
		switch (button.id) {
			case 'changePasswordButton':
				html = `
                    <h1>Modifier votre mot de passe</h1>
                    <p>
                        Afin de modifier votre mot de passe, insérer votre mot de passe actuel ainsi
                        que le nouveau.
                    </p>

                    <div class="input-group">
                        <label for="oldPassword">Mot de passe actuel</label>
                        <input type="password" name="oldPassword" id="oldPassword" />
                    </div>
                    <div class="input-group">
                        <label for="newPassword">Nouveau mot de passe</label>
                        <input type="password" name="newPassword" id="newPassword" />
                    </div>
                    <div class="input-group">
                        <label for="confirmPassword">Confirmer le nouveau mot de passe</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" />
                    </div>

                    <div class="button-container">
                        <button
                            type="button"
                            onclick="document.getElementById('modal').style.display='none'"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            onclick="document.getElementById('modal').style.display='none'"
                            class="btn-success"
                        >
                            Confirmer
                        </button>
                    </div>
                `;

				modalContent.innerHTML = html;

				break;
			case 'deleteAccountButton':
				html = `
                    <h1>Suppression du compte</h1>
                    <p>Vous vous apprêtez à supprimer votre compte, cet action est irréversible.</p>

                    <div class="button-container">
                        <button
                            type="button"
                            onclick="document.getElementById('modal').style.display='none'"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            onclick="document.getElementById('modal').style.display='none'"
                            class="btn-danger"
                        >
                            Supprimer
                        </button>
                    </div>
                `;

				modalContent.innerHTML = html;

				break;
		}

		const modal = document.getElementById('modal');
		modal.style.display = 'block';
	});
});

const modalForm = document.getElementById('modalForm');
modalForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const formData = new FormData(modalForm);
	const oldPassword = formData.has('oldPassword') ? formData.get('oldPassword') : null;
	const newPassword = formData.has('newPassword') ? formData.get('newPassword') : null;
	const confirmPassword = formData.has('confirmPassword')
		? formData.get('confirmPassword')
		: null;

	if (oldPassword !== null && newPassword !== null && confirmPassword !== null) {
		if (oldPassword.length > 0 && newPassword.length > 0 && confirmPassword.length > 0) {
			if (newPassword === confirmPassword) {
				const response = await fetch('http://localhost:3500/api/v1/users/change-password', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						xauthorization: tokenAuth,
					},
					body: JSON.stringify({
						oldPassword,
						newPassword,
					}),
				});

				if (response.status === 200) {
					alert('Votre mot de passe a été modifié avec succès');
				} else {
					alert('Une erreur est survenue, veuillez réessayer plus tard.');
				}
			} else {
				alert('Les mots de passe ne correspondent pas.');
				return;
			}
		} else {
			alert('Veuillez remplir tous les champs.');
			return;
		}
	} else {
		// Delete user account
		const response = await fetch('http://localhost:3500/api/v1/users', {
			method: 'DELETE',
			headers: {
				xauthorization: tokenAuth,
			},
		});

		console.log(response);

		if (response.status === 204) {
			localStorage.removeItem('tokenAuth');
			window.location.href = '/client/';
		} else {
			alert('Une erreur est survenue, veuillez réessayer.');
		}
	}

	const modal = document.getElementById('modal');
	modal.style.display = 'none';
});
