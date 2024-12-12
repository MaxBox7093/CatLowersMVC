document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            topic: "Общие вопросы",
            title: "Как ухаживать за котёнком?",
            description: "Котёнок требует особого ухода. Вопросы, связанные с кормлением, приучением к лотку и прививками..."
        },
        {
            topic: "Питание",
            title: "Чем кормить взрослую кошку?",
            description: "Взрослая кошка нуждается в сбалансированном рационе, чтобы быть здоровой и активной..."
        },
        {
            topic: "Здоровье",
            title: "Как узнать, что кошка заболела?",
            description: "Симптомы, которые должны вас насторожить: отказ от еды, вялость, странное поведение..."
        }
    ];

    const questionList = document.querySelector(".question-list");
    questions.forEach(question => {
        const questionItem = document.createElement("li");
        questionItem.className = "question-item";

        questionItem.innerHTML = `
            <h2 class="question-title">${question.title}</h2>
            <p class="question-topic">Тема: ${question.topic}</p>
            <p class="question-description">${question.description.slice(0, 200)}...</p>
        `;

        questionList.appendChild(questionItem);
    });
});
