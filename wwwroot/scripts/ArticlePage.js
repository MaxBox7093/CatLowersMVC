const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

async function loadArticle() {
    if (!articleId) {
        document.getElementById('article-content').innerHTML = "<p>Не указан идентификатор статьи.</p>";
        return;
    }

    try {
        const response = await fetch('http://localhost:5002/article/' + articleId);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке статьи');
        }
        const data = await response.json();

        if (!data) {
            document.getElementById('article-content').innerHTML = "<p>Статья не найдена.</p>";
            return;
        }

        document.getElementById('article-title').textContent = data.title;
        document.getElementById('article-content').innerHTML = data.text;

        const categoryName = await loadCategoryName(data.idCategory);
        document.querySelector('#article-category span').textContent = categoryName || "Не указана";

        const tagsContainer = document.getElementById('article-tags');
        const tagsArray = data.tags ? data.tags.split(',').map(tag => tag.trim()) : [];

        tagsArray.forEach(tag => {
            const span = document.createElement('span');
            span.classList.add('tag');
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });
    } catch (error) {
        console.error('Ошибка при загрузке статьи:', error);
        document.getElementById('article-content').innerHTML = "<p>Ошибка при загрузке статьи.</p>";
    }
}

async function loadCategoryName(categoryId) {
    if (!categoryId) {
        return "Не указана";
    }

    try {
        const response = await fetch('http://localhost:5002/Category/' + categoryId);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке категории');
        }
        const categoryData = await response.json();
        return categoryData.category || "Не указана";
    } catch (error) {
        console.error('Ошибка при загрузке категории:', error);
        return "Ошибка загрузки категории";
    }
}

loadArticle();