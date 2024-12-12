window.addEventListener('DOMContentLoaded', () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
        alert('Пожалуйста, войдите в систему, чтобы использовать эту функцию.');
        window.location.href = '../pages/Login.html'; // Перенаправление на страницу входа
    }
});