  document.addEventListener('DOMContentLoaded', () => {
    const confirmationCheckbox = document.getElementById('confirmationCheckbox');
    const publishButton = document.getElementById('publishButton');

    const categoryElement = document.querySelector('#articleCategory span');
    const idCategory = categoryElement ? parseInt(categoryElement.dataset.id, 10) : null;

    confirmationCheckbox.addEventListener('change', () => {
        publishButton.disabled = !confirmationCheckbox.checked;
    });

    publishButton.addEventListener('click', () => {
        /*if (idCategory === null) {
            alert('Ошибка: категория не указана.');
            return;
        }*/

    const articleData = {
        title: document.getElementById('articleTitle').textContent.trim(),
    text: document.getElementById('articleContent').textContent.trim(),
    tags: Array.from(document.querySelectorAll('#articleTags .tag'))
                   .map(tag => tag.textContent.trim())
    .join(', '), 
    idCategory: 1,//todo
    idUser: 1 // todo
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
