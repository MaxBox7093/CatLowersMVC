// Обработка отправки формы
document.getElementById('question-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    // Проверка на авторизацию перед отправкой формы
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
        alert('Вы не авторизованы! Пожалуйста, войдите в систему.');
        window.location.href = '../pages/Login.html'; // Перенаправление на страницу входа
        return;
    }

    // Добавляем idUser в запрос
    formData.append('idUser', userId);

    try {
        const response = await fetch('http://localhost:5002/question/create', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Вопрос успешно опубликован!');
            this.reset(); // Сбрасываем форму
        } else {
            const error = await response.json();
            alert(`Ошибка: ${error.message || 'Не удалось отправить вопрос.'}`);
        }
    } catch (err) {
        console.error('Ошибка при отправке:', err);
        alert('Произошла ошибка. Попробуйте позже.');
    }
});
