const url = 'http://localhost:5002/article'; 

function getArticleList() {
    fetch(`${url}/all`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
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

                const link = document.createElement('a');
                link.href = `articlepage.html?id=${article.id}`;

                const div = document.createElement('div');
                div.classList.add('article-item');

                const title = document.createElement('h2');
                title.classList.add('article-title');
                title.textContent = article.title;

                const topic = document.createElement('p');
                topic.classList.add('article-topic');
                topic.textContent = `Тема: ${article.topic}`;

                const tags = document.createElement('p');
                tags.classList.add('article-tags');
                tags.textContent = `Теги: ${article.tags}`;

                link.appendChild(div);
                div.appendChild(title);
                div.appendChild(topic);
                div.appendChild(tags);

                divContainer[0].appendChild(link);
            });
        })
        .catch(error => {
            console.error('Ошибка при запросе:', error);
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
                topic.textContent = `Тема: ${article.topic}`;

                const tags = document.createElement('p');
                tags.classList.add('article-tags');
                tags.textContent = `Теги: ${article.tags}`;

                div.appendChild(title);
                div.appendChild(topic);
                div.appendChild(tags);

                divContainer[0].appendChild(div);
            });
        })
        .catch(error => {
            console.error('Ошибка при запросе:', error);
        });
}

getArticleList();
