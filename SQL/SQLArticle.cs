using CatLowersMVC.Models;
using CatLowersAPI.SQL;
using Microsoft.Data.SqlClient;

namespace CatLowersMVC.SQL
{
    public class SQLArticle
    {
        public void AddArticle(Article article, int userId)
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
                    command.Parameters.AddWithValue("@idUser", userId);
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
    }
}
