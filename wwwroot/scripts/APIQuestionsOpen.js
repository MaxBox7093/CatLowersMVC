document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const questionId = params.get("id");

    if (!questionId) {
        document.getElementById("question-content").innerHTML = `<div class="alert alert-danger">ID вопроса не найден.</div>`;
        return;
    }

    try {
        console.log(`Загружаем данные для вопроса с ID: ${questionId}`); // Лог ID вопроса

        const response = await fetch(`http://localhost:5002/question/getById/${questionId}`);
        console.log("HTTP статус ответа:", response.status); // Лог статуса ответа

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const question = await response.json();
        console.log("Полученные данные о вопросе:", question); // Лог данных, полученных с сервера

        // Получаем информацию о теме
        const topicResponse = await fetch(`http://localhost:5002/topic/${question.idTopic}`);
        console.log("HTTP статус ответа для темы:", topicResponse.status); // Лог статуса ответа для темы

        if (!topicResponse.ok) {
            throw new Error(`HTTP error when fetching topic! status: ${topicResponse.status}`);
        }

        const topic = await topicResponse.json();
        console.log("Полученные данные о теме:", topic); // Лог данных о теме

        // Обновляем данные на странице
        document.getElementById("question-title").textContent = question.title || "Без названия";
        document.getElementById("question-topic").textContent = `Тема: ${topic.topic || "Не указана"}`;
        document.getElementById("question-content").innerHTML = `<p>${question.text || "Нет описания"}</p>`;
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        document.getElementById("question-content").innerHTML = `<div class="alert alert-danger">Не удалось загрузить данные о вопросе или теме.</div>`;
    }
});
