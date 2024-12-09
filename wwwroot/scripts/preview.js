document.getElementById('previewButton').addEventListener('click', function () {
    // Получаем значения из формы
    const title = document.querySelector('input[name="title"]').value;
    const category = document.querySelector('select[name="category"]').value;
    const content = document.querySelector('textarea[name="content"]').value;
    const tags = document.querySelector('input[name="tags"]').value;
  
    // Проверяем, что все обязательные поля заполнены
    if (!title || !category || !content) {
      alert('Пожалуйста, заполните все обязательные поля!');
      return;
    }
  
    // Открываем новое окно для предпросмотра
    const previewWindow = window.open('', '_blank');
    
    // Загружаем HTML-шаблон из внешнего файла
    fetch('../pages/PreviewPage.html')
      .then(response => response.text())
      .then(html => {
        previewWindow.document.write(html);
  
        // Заполняем данные на странице
        previewWindow.document.getElementById('articleTitle').innerText = title;
        previewWindow.document.getElementById('articleCategory').innerText = `Категория: ${category}`;
        previewWindow.document.getElementById('articleContent').innerText = content;
        previewWindow.document.getElementById('articleTags').innerHTML = tags ? `Теги: ${tags}` : '';
        previewWindow.document.close();
      })
      .catch(error => {
        console.error('Ошибка загрузки HTML-шаблона:', error);
        alert('Произошла ошибка при загрузке шаблона');
      });
  });
  