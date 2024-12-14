document.addEventListener("DOMContentLoaded", function () {
    const currentUserId = sessionStorage.getItem("userId");
    const isUserAuthenticated = currentUserId !== null;
    const articleId = new URLSearchParams(window.location.search).get('id');
    const mainContainer = document.querySelector("main");

    const commentsContainer = document.createElement("div");
    commentsContainer.id = "comments-container";
    mainContainer.appendChild(commentsContainer);

    async function loadComments() {
        try {
            const response = await fetch("/question/questionComments/" + articleId, {
                method: "GET",
                headers:
                {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const comments = await response.json();
                displayComments(comments);
            }
            else {
                commentsContainer.innerHTML = "<p>Не удалось загрузить комментарии.</p>";
            }
        } catch (error) {
            console.error("Ошибка при получении комментариев:", error);
            commentsContainer.innerHTML = "<p>Произошла ошибка при загрузке комментариев.</p>";
        }
    }

    function displayComments(comments) {
        commentsContainer.innerHTML = "";

        if (comments.length === 0) {
            commentsContainer.innerHTML = "<p>Комментариев пока нет.</p>";
        }
        else {
            comments.forEach(comment => {
                const commentElement = document.createElement("div");
                commentElement.classList.add("card", "mb-3");

                const commentDate = new Date(comment.createDate).toLocaleString();

                commentElement.innerHTML = `<div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-1"> Пользователь ${comment.userId}</h5>
                        <span class="text-muted small">${commentDate}</span>
                    </div>
                    <p class="card-text">${comment.text}</p>
                    ${currentUserId == comment.userId
                        ? '<button class="btn btn-sm btn-outline-danger delete-comment">Удалить</button>'
                        : ''
                    }
                    </div>`;

                commentsContainer.appendChild(commentElement);

                const deleteButton = commentElement.querySelector(".delete-comment");
                if (deleteButton) {
                    deleteButton.addEventListener("click", function () {
                        deleteComment(comment.id, commentElement);
                    });
                }
            });
        }
    }

    async function deleteComment(commentId, commentElement) {
        try {
            const response = await fetch(`/question/deleteComment/${commentId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                commentElement.remove();
            }
            else {
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
                    QuestionId: articleId,
                    UserId: currentUserId,
                    CreateDate: new Date().toISOString(),
                    Text: commentText,
                };

                try {
                    const response = await fetch("/question/createComment", {
                        method: "POST",
                        headers:
                        {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newComment),
                    });

                    if (response.ok) {
                        alert("Комментарий добавлен.");
                        textarea.value = "";
                        loadComments();
                    }
                    else {
                        alert("Ошибка при добавлении комментария. Попробуйте снова.");
                    }
                }
                catch (error) {
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
