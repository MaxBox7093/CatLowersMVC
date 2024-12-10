document.getElementById('questionForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch('http://localhost:5002/question/create', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Вопрос успешно опубликован!');
            this.reset(); // Сбросить форму
        } else {
            const error = await response.json();
            alert(`Ошибка: ${error.message || 'Не удалось отправить вопрос.'}`);
        }
    } catch (err) {
        console.error('Ошибка при отправке:', err);
        alert('Произошла ошибка. Попробуйте позже.');
    }
});
