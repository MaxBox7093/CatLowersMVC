document.getElementById('previewButton').addEventListener('click', function () {
    // Получаем значения из формы
    const title = document.querySelector('input[name="title"]').value;
    const category = document.querySelector('select[name="category"]');
    const content = document.querySelector('textarea[name="content"]').value;
    const tags = document.querySelector('input[name="tags"]').value;
    const categoryId = document.getElementById('categorySelect').value;

    // Проверяем, что все обязательные поля заполнены
    if (!title || !category || !content) {
        alert('Пожалуйста, заполните все обязательные поля!');
        return;
    }

    // Открываем новое окно для предпросмотра
    const previewWindow = window.open('http://localhost:5002/', '_blank');

    // Загружаем HTML-шаблон из внешнего файла
    fetch('/pages/PreviewPage.html')
        .then(response => response.text())
        .then(html => {
            previewWindow.document.open();
            previewWindow.document.write(html);
            previewWindow.document.close();

            // Убедитесь, что DOM полностью загружен
            previewWindow.addEventListener('load', () => {
                // Заполняем данные на странице
                previewWindow.document.getElementById('articleTitle').innerText = title;
                previewWindow.document.getElementById('articleCategory').innerText = `Категория: ${category.options[category.selectedIndex].text}`;
                previewWindow.document.getElementById('articleContent').innerText = content;

                // Обработка тегов
                let tagsArray = tags.split(",").map(tag => tag.trim());
                let container = previewWindow.document.getElementById('articleTags');
                if (container) {
                    tagsArray.forEach(tag => {
                        let span = document.createElement('span');
                        span.classList.add('tag');
                        span.textContent = tag;
                        container.appendChild(span);
                    });
                }
            });

            // Передаём данные в открытое окно
            previewWindow.postMessage({ categoryId: categoryId }, '*');
        })
        .catch(error => {
            alert('Ошибка загрузки HTML-шаблона. Проверьте файл.');
            console.error('Ошибка загрузки HTML-шаблона:', error);
        });
});
