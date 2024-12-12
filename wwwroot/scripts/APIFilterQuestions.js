document.addEventListener("DOMContentLoaded", () => {
    const questionList = document.querySelector(".question-list");
    const searchButton = document.getElementById("search-button");
    const searchKeyword = document.getElementById("search-keyword");
    const filterTopic = document.getElementById("filter-topic");

    // Функция для загрузки вопросов с API
    async function loadQuestions(keyword = "", topicId = "") {
        try {
            const params = new URLSearchParams();
            if (keyword) params.append("keyword", keyword);
            if (topicId) params.append("idTopic", topicId);

            const url = `http://localhost:5002/question/search?${params.toString()}`;
            console.log("Отправляемый URL:", url); // Лог URL запроса

            const response = await fetch(url);
            console.log("HTTP статус ответа:", response.status); // Лог статуса ответа

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const questions = await response.json();
            console.log("Полученные данные:", questions); // Лог данных, полученных с сервера

            // Очистка списка перед добавлением новых элементов
            questionList.innerHTML = "";

            // Проверяем, есть ли данные
            if (!questions || questions.length === 0) {
                questionList.innerHTML = `<li class="no-questions">Нет доступных вопросов.</li>`;
                return;
            }

            questions.forEach(question => {
                const questionItem = document.createElement("li");
                questionItem.className = "question-item";

                questionItem.innerHTML = `
                    <h2 class="question-title">${question.title || "Без названия"}</h2>
                    <p class="question-topic">Тема: ${question.topicName || "Не указана"}</p>
                    <p class="question-description">${(question.text || "Нет описания").slice(0, 100)}...</p>
                `;

                questionList.appendChild(questionItem);
            });

        } catch (error) {
            console.error("Ошибка загрузки вопросов:", error); // Лог ошибки
            questionList.innerHTML = `<li class="error-message">Не удалось загрузить вопросы.</li>`;
        }
    }

    // Добавляем обработчик на кнопку "Найти"
    searchButton.addEventListener("click", () => {
        const keyword = searchKeyword.value.trim();
        const topicId = filterTopic.value;
        console.log("Ключевое слово:", keyword); // Лог введенного ключевого слова
        console.log("ID темы:", topicId); // Лог выбранной темы
        loadQuestions(keyword, topicId);
    });

    // Загружаем все вопросы при открытии страницы
    loadQuestions();
});
