const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

[signUpButton, signInButton].forEach((button) => {
	button.addEventListener('click', () => {
		container.classList.toggle('right-panel-active');
	});
});
