// Get the modal
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
	if (event.target == modal) {
		modal.style.display = 'none';
		modalContent.innerHTML = '';
	}
};
