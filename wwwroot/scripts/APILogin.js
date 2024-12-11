// Глобальная переменная для хранения ID пользователя
let userId = null;

document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем данные из формы
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const resultElement = document.getElementById("login-result");

    // Проверяем, что поля не пустые
    if (!username || !password) {
        resultElement.textContent = "Заполните все поля!";
        resultElement.style.color = "red";
        return;
    }

    // Отправляем запрос к серверу
    try {
        console.log("Отправка запроса...");
        const response = await fetch("http://localhost:5002/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ login: username, password: password })
        });

        console.log("Получен ответ от сервера:", response);

        // Проверяем, успешен ли запрос
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Ошибка от сервера:", errorData);
            resultElement.textContent = errorData.message || "Ошибка авторизации.";
            resultElement.style.color = "red";
            return;
        }

        // Обрабатываем успешный ответ
        const data = await response.json();
        console.log("Данные от сервера:", data);

        // Прямое присвоение, если сервер возвращает число
        userId = data;
        localStorage.setItem("userId", userId); // Сохраняем глобально

        resultElement.textContent = `Успешный вход! Перенаправление...`;
        resultElement.style.color = "green";

        console.log("Глобальный userId:", userId);

        // Переход на главную страницу через 2 секунды
        setTimeout(() => {
            window.location.href = `../../index.html`;
        }, 2000);

    } catch (error) {
        // Ловим ошибки соединения
        console.error("Ошибка соединения с сервером:", error);
        resultElement.textContent = "Проверьте логин и пароль!";
        resultElement.style.color = "red";
    }
});
