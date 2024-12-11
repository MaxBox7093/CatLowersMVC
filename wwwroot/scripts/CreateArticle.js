const categoriesApiUrl = 'http://localhost:5002/category/all';
const createArticleApiUrl = 'https://example.com/api/articles';
function loadCategories() {
    try {
        fetch('http://localhost:5002/Category/all')
            .then(response => response.json())
            .then(categories => {
                const categorySelect = document.getElementById('categorySelect');
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.category;
                    categorySelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    } catch (error) {
        console.error(error);
        document.getElementById('message').textContent = 'Не удалось загрузить категории';
    }
}

loadCategories();