const url = 'http://localhost:5002/article'; 

let categoriesCache = []; 
function getCategoryNameById(categoryId) {
    const category = categoriesCache.find(cat => cat.id === categoryId);
    return category ? category.category : 'Категория не найдена';
}

async function loadCategories() {
    try {
        const response = await fetch('http://localhost:5002/Category/all');
        const categories = await response.json();
        categoriesCache = categories;  
    } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
    }
}

async function getArticleList() {
    try {
        const response = await fetch(`${url}/all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error('Ошибка в ответе от сервера');
        }

        const data = await response.json();
        console.log('Полученные статьи:', data);

        const divContainer = document.getElementsByClassName('article-list');

        data.forEach(article => {
            const link = document.createElement('a');
            link.href = `articlepage.html?id=${article.id}`;

            const div = document.createElement('div');
            div.classList.add('article-item');

            const title = document.createElement('h2');
            title.classList.add('article-title');
            title.textContent = article.title;

            const categoryName = getCategoryNameById(article.idCategory); 

            const category = document.createElement('p');
            category.classList.add('article-category');
            category.textContent = `Категория: ${categoryName}`;

            const tagsContainer = document.createElement('div');
            tagsContainer.classList.add('tags');
            tagsContainer.id = 'articleTags';

            const tagsArray = article.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

            tagsArray.forEach(tag => {
                const span = document.createElement('span');
                span.classList.add('tag');
                span.textContent = tag;
                tagsContainer.appendChild(span);
            });

            link.appendChild(div);
            div.appendChild(title);
            div.appendChild(category);  
            div.appendChild(tagsContainer);

            divContainer[0].appendChild(link);
        });
    } catch (error) {
        console.error('Ошибка при запросе:', error);
    }
}

async function loadContent() {
    await loadCategories();
    await getArticleList();
    await setCategoriesList();
}

async function setCategoriesList() {
    if (categoriesCache == []) {
        await loadCategories();
    }

    const categorySelect = document.getElementById('filter-topic');
    categoriesCache.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.category;
        categorySelect.appendChild(option);
    });
}

function getArticle(id) {
    fetch(`${url}/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка в ответе от сервера');
            }
            return response.json();
        })
        .then(data => {
            console.log('Полученные статьи:', data);

            const divContainer = document.getElementsByClassName('article-list');

            data.forEach(article => {
                const div = document.createElement('div');
                div.classList.add('article-item');

                const title = document.createElement('h2');
                title.classList.add('article-title');
                title.textContent = article.title;

                const topic = document.createElement('p');
                topic.classList.add('article-topic');
                topic.textContent = `Категория: ${article.topic}`;

                const tags = document.createElement('p');
                tags.classList.add('article-tags');
                tags.textContent = `Теги: ${article.tags}`;

                div.appendChild(title);
                div.appendChild(topic);
                div.appendChild(tags);

                article.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = `badge bg-primary`;
                    span.textContent = tag.name;
                    tagsContainer.appendChild(span);
                });

                divContainer[0].appendChild(div);
            });
        })
        .catch(error => {
            console.error('Ошибка при запросе:', error);
        });
}

function filterArticles() {
    const searchInput = document.getElementById('search-keyword');
    const filterTopic = document.getElementById('filter-topic');
    const articles = Array.from(document.querySelectorAll('.article-item'));

    const keyword = searchInput.value.toLowerCase();
    const selectedValue = filterTopic.value;
    const selectedText = filterTopic.options[filterTopic.selectedIndex]?.text.toLowerCase().trim() || '';

    articles.forEach(article => {
        const title = article.querySelector('.article-title').textContent.toLowerCase();
        const topicText = article.querySelector('.article-category')?.textContent.toLowerCase() || '';

        const topic = topicText.replace('категория: ', '').trim();

        const matchesKeyword = title.includes(keyword);
        const matchesTopic = selectedValue === '' || topic.includes(selectedText);

        if (matchesKeyword && matchesTopic) {
            article.style.display = '';
        } else {
            article.style.display = 'none';
        }
    });
}

loadContent();
