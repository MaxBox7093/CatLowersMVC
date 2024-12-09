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
    }
}
