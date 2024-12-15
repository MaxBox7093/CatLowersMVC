document.addEventListener("DOMContentLoaded", function () {
    const currentUserId = sessionStorage.getItem("userId");
    const isUserAuthenticated = currentUserId !== null;
    const articleId = new URLSearchParams(window.location.search).get('id');
    const mainContainer = document.querySelector("main.articles");

    const commentsContainer = document.createElement("div");
    commentsContainer.id = "comments-container";
    mainContainer.appendChild(commentsContainer);

    const userCache = new Map();

    async function getUserName(userId) {
        if (userCache.has(userId)) {
            return userCache.get(userId);
        }

        try {
            const response = await fetch(`/user/getName/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const userName = await response.text();
                userCache.set(userId, userName);
                return userName;
            } else {
                console.error("Не удалось загрузить имя пользователя.");
                return `User ${ userId }`; 
            }
        } catch (error) {
            console.error("Ошибка при получении имени пользователя:", error);
            return `User ${ userId }`;
        }
    }

    async function loadComments() {
        try {
            const response = await fetch("/article/articleComments/" + articleId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const comments = await response.json();
                displayComments(comments);
            } else {
                commentsContainer.innerHTML = "<p>Не удалось загрузить комментарии.</p>";
            }
        } catch (error) {
            console.error("Ошибка при получении комментариев:", error);
            commentsContainer.innerHTML = "<p>Произошла ошибка при загрузке комментариев.</p>";
        }
    }

    async function displayComments(comments) {
        commentsContainer.innerHTML = "";

        if (comments.length === 0) {
            commentsContainer.innerHTML = "<p>Комментариев пока нет.</p>";
        } else {
            for (const comment of comments) {
                const commentElement = document.createElement("div");
                commentElement.classList.add("card", "mb-3");

                const commentDate = new Date(comment.createDate).toLocaleString();
                const userName = await getUserName(comment.userId);

                commentElement.innerHTML = `
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-1">${userName}</h5>
                        <span class="text-muted small">${commentDate}</span>
                    </div>
                    <p class="card-text">${comment.text}</p>
                    ${currentUserId == comment.userId
                        ? '<button class="btn btn-sm btn-outline-danger delete-comment">Удалить</button>'
                        : ''
                    }
                </div>
                `;

                commentsContainer.appendChild(commentElement);

                const deleteButton = commentElement.querySelector(".delete-comment");
                if (deleteButton) {
                    deleteButton.addEventListener("click", function () {
                        deleteComment(comment.id, commentElement);
                    });
                }
            }
        }
    }

    async function deleteComment(commentId, commentElement) {
        try {
            const response = await fetch(`/article/deleteComment/${commentId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                commentElement.remove();
            } else {

                alert("Не удалось удалить комментарий.");
            }
        } catch (error) {
            console.error("Ошибка при удалении комментария:", error);
            alert("Произошла ошибка при удалении комментария.");
        }
    }

    loadComments();

    if (isUserAuthenticated) {
        const commentForm = document.createElement("form");
        commentForm.id = "comment-form";
        commentForm.classList.add("mt-4");

        const textarea = document.createElement("textarea");
        textarea.id = "comment-text";
        textarea.classList.add("form-control", "mb-2");
        textarea.rows = 3;
        textarea.placeholder = "Введите ваш комментарий...";

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.classList.add("btn", "btn-primary");
        submitButton.textContent = "Добавить комментарий";

        commentForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const commentText = textarea.value.trim();
            if (commentText) {
                const newComment = {
                    ArticleId: articleId,
                    UserId: currentUserId,
                    CreateDate: new Date().toISOString(),
                    Text: commentText,
                };

                try {
                    const response = await fetch("/article/createComment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newComment),
                    });

                    if (response.ok) {
                        alert("Комментарий добавлен.");
                        textarea.value = "";
                        loadComments();
                    } else {
                        alert("Ошибка при добавлении комментария. Попробуйте снова.");
                    }
                } catch (error) {
                    console.error("Ошибка при отправке комментария:", error);
                    alert("Не удалось добавить комментарий. Проверьте соединение с сервером.");
                }
            } else {
                alert("Комментарий не может быть пустым.");
            }
        });

        commentForm.appendChild(textarea);
        commentForm.appendChild(submitButton);
        mainContainer.appendChild(commentForm);
    }
});