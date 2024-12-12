function logout() {
    sessionStorage.clear();
    location.reload();
}
document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('header-container');
    fetch('/pages/modules/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки header: ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            headerContainer.innerHTML = html;

            const userId = sessionStorage.getItem('userId');
            const registerLink = headerContainer.querySelector('#register-link');
            const loginLink = headerContainer.querySelector('#login-link');

            if (userId) {
                registerLink.style.display = 'none';
            }
            else {
                loginLink.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке header:', error);
        });
});