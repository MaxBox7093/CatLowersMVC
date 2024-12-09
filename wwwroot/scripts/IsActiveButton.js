const checkbox = document.getElementById('confirmationCheckbox');
const publishButton = document.getElementById('publishButton');

checkbox.addEventListener('change', () => {
publishButton.disabled = !checkbox.checked;
});