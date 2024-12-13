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
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const questions = await response.json();

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
                    <a href="./QuestionPage.html?id=${question.id}" class="question-link">
                        <h2 class="question-title">${question.title || "Без названия"}</h2>
                        <p class="question-topic">Тема: ${question.topicName || "Не указана"}</p>
                        <p class="question-description">${(question.text || "Нет описания").slice(0, 100)}...</p>
                    </a>
                `;

                // Убедитесь, что событие клика не блокирует переход
                questionItem.querySelector("a").addEventListener("click", (event) => {
                    console.log(`Клик по вопросу с ID: ${question.id}`);
                });

                questionList.appendChild(questionItem);
            });
        } catch (error) {
            console.error("Ошибка загрузки вопросов:", error);
            questionList.innerHTML = `<li class="error-message">Не удалось загрузить вопросы.</li>`;
        }
    }

    // Обработчик на кнопку "Найти"
    searchButton.addEventListener("click", () => {
        const keyword = searchKeyword.value.trim();
        const topicId = filterTopic.value;
        loadQuestions(keyword, topicId);
    });

    // Загружаем все вопросы при открытии страницы
    loadQuestions();
});
