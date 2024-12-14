using CatLowersMVC.Models;
using CatLowersAPI.SQL;
using Microsoft.Data.SqlClient;

namespace CatLowersMVC.SQL
{
    public class SQLArticle
    {
        public void AddArticle(Article article)
        {
            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();

                // SQL-запрос на вставку
                string query = @"
                    INSERT INTO [dbo].[articles] 
                    (idUser, idCategory, tags, title, text) 
                    VALUES (@idUser, @idCategory, @tags, @title, @text)";

                using (var command = new SqlCommand(query, connection))
                {
                    // Добавляем параметры
                    command.Parameters.AddWithValue("@idUser", article.IdUser);
                    command.Parameters.AddWithValue("@idCategory", article.IdCategory);
                    command.Parameters.AddWithValue("@tags", article.Tags);
                    command.Parameters.AddWithValue("@title", article.Title);
                    command.Parameters.AddWithValue("@text", article.Text);

                    // Выполняем запрос
                    command.ExecuteNonQuery();
                }
            }
        }
        public List<Article> GetAllArticles()
        {
            var articles = new List<Article>();

            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();

                string query = "SELECT id, title, text, tags, idCategory FROM [dbo].[articles]";

                using (var command = new SqlCommand(query, connection))
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var article = new Article
                        {
                            Id = reader.GetInt32(0),
                            Title = reader.GetString(1),
                            Text = reader.GetString(2),
                            Tags = reader.GetString(3),
                            IdCategory = reader.GetInt32(4)
                        };
                        articles.Add(article);
                    }
                }
            }

            return articles;
        }
        public Article GetArticleById(int id)
        {
            Article article = null;

            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();

                string query = "SELECT id, title, text, tags, idCategory FROM [dbo].[articles] WHERE id = @id";

                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@id", id);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            article = new Article
                            {
                                Id = reader.GetInt32(0),
                                Title = reader.GetString(1),
                                Text = reader.GetString(2),
                                Tags = reader.GetString(3),
                                IdCategory = reader.GetInt32(4)
                            };
                        }
                    }
                }
            }

            return article;
        }
        public void AddComment(ArticleComment comment)
        {
            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();

                string query = @"
                    INSERT INTO [dbo].[articleComments] 
                    (ArticleId, UserId, CreateDate, Text) 
                    VALUES (@ArticleId, @UserId, @CreateDate, @Text)";

                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@ArticleId", comment.ArticleId);
                    command.Parameters.AddWithValue("@UserId", comment.UserId);
                    command.Parameters.AddWithValue("@CreateDate", comment.CreateDate);
                    command.Parameters.AddWithValue("@Text", comment.Text);

                    command.ExecuteNonQuery();
                }
            }
        }

        public List<ArticleComment> GetArticleComments(int articleId)
        {
            var articles = new List<ArticleComment>();

            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();

                string query = "SELECT * FROM [dbo].[articleComments] where ArticleId = @ArticleId";


                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@ArticleId", articleId);
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var article = new ArticleComment
                            {
                                Id = reader.GetInt32(0),
                                ArticleId = reader.GetInt32(1),
                                UserId = reader.GetInt32(2),
                                CreateDate = reader.GetDateTime(3),
                                Text = reader.GetString(4)
                            };
                            articles.Add(article);
                        }
                    }
                }
            }

            return articles;
        }

        public void DeleteComment(int commentId)
        {
            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();

                string query = @"
                    DELETE FROM [dbo].[articleComments] 
                    WHERE id = @id";

                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@id", commentId);
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}
