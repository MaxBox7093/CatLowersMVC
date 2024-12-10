const url = 'http://localhost:5002/article/all'; 

fetch(url, {
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
