let categoryId;
window.addEventListener('message', (event) => {
    categoryId = event.data.categoryId;

    if (!categoryId) {
        alert('Параметр categoryId не найден!');
        return;
    }
    console.log('Category ID:', categoryId);
});

document.addEventListener('DOMContentLoaded', () => {
    const confirmationCheckbox = document.getElementById('confirmationCheckbox');
    const publishButton = document.getElementById('publishButton');

    confirmationCheckbox.addEventListener('change', () => {
        publishButton.disabled = !confirmationCheckbox.checked;
    });

    publishButton.addEventListener('click', () => {
        const articleData = {
            title: document.getElementById('articleTitle').textContent.trim(),
            text: document.getElementById('articleContent').textContent.trim(),
            tags: document.getElementById('articleTags').textContent.trim().replace("Теги: ", ""),

            idCategory: categoryId,
            idUser: sessionStorage.getItem('userId'),
        };

        fetch('http://localhost:5002/article/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(articleData),
        })
            .then(response => {
                if (response.ok) {
                    alert('Статья успешно опубликована!');
                } else {
                    alert('Ошибка при публикации статьи.');
                }
            })
            .catch(error => {
                console.error('Ошибка при отправке статьи:', error);
                alert('Ошибка соединения с сервером.');
            });
    });
});
