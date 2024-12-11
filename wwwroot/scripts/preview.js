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
    const previewWindow = window.open('', '_blank');
    
    // Загружаем HTML-шаблон из внешнего файла
    fetch('../pages/PreviewPage.html')
      .then(response => response.text())
      .then(html => {
          previewWindow.document.write(html);

          previewWindow.addEventListener('load', () => {
              previewWindow.postMessage({ categoryId: categoryId }, '*');
          });
  
        // Заполняем данные на странице
        previewWindow.document.getElementById('articleTitle').innerText = title;
        previewWindow.document.getElementById('articleCategory').innerText = `Категория: ${category.options[category.selectedIndex].text}`;
        previewWindow.document.getElementById('articleContent').innerText = content;
        let tagsArray = tags.split(",").map(tag => tag.trim()); 
        let container = previewWindow.document.getElementById('articleTags'); 
        tagsArray.forEach(tag => {
            let span = document.createElement('span'); 
            span.classList.add('tag');
            span.textContent = tag; 

            container.appendChild(span); 
        });
        previewWindow.document.close();
      })
      .catch(error => {
        console.error('Ошибка загрузки HTML-шаблона:', error);
        alert('Произошла ошибка при загрузке шаблона');
      });
  });
  