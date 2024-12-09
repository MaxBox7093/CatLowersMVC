document.getElementById('registration-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Собираем данные формы
    const formData = {
        fullName: document.getElementById('fullname').value.trim(),
        login: document.getElementById('username').value.trim(),
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirm-password').value,
        city: document.getElementById('city').value.trim(),
        dateOfBirth: document.getElementById('dob').value
    };

    // Простая валидация
    let isValid = true;

    // Логин должен содержать минимум 6 символов
    const usernameHint = document.getElementById('username-hint');
    if (formData.login.length < 6) {
        usernameHint.textContent = 'Логин должен содержать минимум 6 символов.';
        usernameHint.style.display = 'block';
        isValid = false;
    } else {
        usernameHint.textContent = '';
        usernameHint.style.display = 'none';
    }

    // Пароль должен быть сильным
    const passwordHint = document.getElementById('password-hint');
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[.@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
        passwordHint.textContent = 'Пароль должен содержать минимум 8 символов, 1 цифру, 1 спецсимвол и 1 заглавную букву.';
        passwordHint.style.display = 'block';
        isValid = false;
    } else {
        passwordHint.textContent = '';
        passwordHint.style.display = 'none';
    }

    // Пароли должны совпадать
    const confirmPasswordHint = document.getElementById('confirm-password-hint');
    if (formData.password !== formData.confirmPassword) {
        confirmPasswordHint.textContent = 'Пароли не совпадают.';
        confirmPasswordHint.style.display = 'block';
        isValid = false;
    } else {
        confirmPasswordHint.textContent = '';
        confirmPasswordHint.style.display = 'none';
    }

    // Если валидация не пройдена
    if (!isValid) {
        console.log('Валидация не пройдена. Форма не отправлена.');
        return;
    }

    console.log('Валидация пройдена. Отправляем данные на сервер...');

    try {
        // Отправка данных на сервер
        const response = await fetch('http://localhost:5002/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FullName: formData.fullName,
                Login: formData.login,
                Password: formData.password,
                City: formData.city,
                DateOfBirth: formData.dateOfBirth
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.Message || 'Регистрация успешна!');
            document.getElementById('registration-form').reset();

            // Переход на стриницу входа
            setTimeout(() => {
                window.location.href = `../pages/Login.html`;
            }, 2000);

        } else {
            alert(`Ошибка: ${result.message || 'Неизвестная ошибка.'}`);
        }
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        alert('Произошла ошибка при регистрации. Попробуйте позже.');
    }
});
