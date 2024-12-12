using System;
using System.Data;
using CatLowersAPI.SQL;
using CatLowersMVC.Models;
using Microsoft.Data.SqlClient;

namespace CatLowersMVC.SQL
{
    public class SQLQuestion
    {
        public int AddQuestion(Question question)
        {
            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();
                var command = new SqlCommand(
                    "INSERT INTO questions (idUser, idTopic, title, text, img) " +
                    "OUTPUT INSERTED.Id " +
                    "VALUES (@IdUser, @IdTopic, @Title, @Text, @Img)",
                    connection);

                command.Parameters.AddWithValue("@IdUser", (object?)question.IdUser ?? DBNull.Value);
                command.Parameters.AddWithValue("@IdTopic", question.IdTopic);
                command.Parameters.AddWithValue("@Title", question.Title ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Text", question.Text ?? (object)DBNull.Value);
                command.Parameters.Add("@Img", SqlDbType.VarBinary).Value = (object?)question.Img ?? DBNull.Value;

                int insertedId = (int)command.ExecuteScalar();
                return insertedId;
            }
        }

        public List<Question> GetAllQuestions()
        {
            var questions = new List<Question>();

            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();
                var command = new SqlCommand(
                    @"SELECT q.id, q.idUser, q.idTopic, t.topic AS TopicName, q.title, q.text, q.img 
              FROM questions q
              JOIN topics t ON q.idTopic = t.Id",
                    connection);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var question = new Question
                        {
                            Id = reader.GetInt32(0),
                            IdUser = reader.IsDBNull(1) ? null : reader.GetInt32(1),
                            IdTopic = reader.GetInt32(2),
                            TopicName = reader.GetString(3), // Чтение названия темы
                            Title = reader.IsDBNull(4) ? null : reader.GetString(4),
                            Text = reader.IsDBNull(5) ? null : reader.GetString(5),
                            Img = reader.IsDBNull(6) ? null : (byte[])reader["img"]
                        };

                        questions.Add(question);
                    }
                }
            }

            return questions;
        }


        // Новый метод для получения вопроса по ID
        public Question GetQuestionById(int id)
        {
            Question question = null;

            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();
                var command = new SqlCommand("SELECT id, idUser, idTopic, title, text, img FROM questions WHERE id = @Id", connection);
                command.Parameters.AddWithValue("@Id", id);

                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        question = new Question
                        {
                            Id = reader.GetInt32(0),
                            IdUser = reader.IsDBNull(1) ? null : reader.GetInt32(1),
                            IdTopic = reader.GetInt32(2),
                            Title = reader.IsDBNull(3) ? null : reader.GetString(3),
                            Text = reader.IsDBNull(4) ? null : reader.GetString(4),
                            Img = reader.IsDBNull(5) ? null : (byte[])reader["img"]
                        };
                    }
                }
            }

            return question;
        }

        public List<Question> SearchQuestions(string? keyword, int? idTopic)
        {
            var questions = new List<Question>();

            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();
                var query = @"
            SELECT q.id, q.idUser, q.idTopic, q.title, q.text, q.img, t.topic AS topicName
            FROM questions q
            LEFT JOIN topics t ON q.idTopic = t.Id
            WHERE 1=1";

                if (!string.IsNullOrEmpty(keyword))
                {
                    query += " AND q.title LIKE @Keyword";
                }

                if (idTopic.HasValue)
                {
                    query += " AND q.idTopic = @IdTopic";
                }

                var command = new SqlCommand(query, connection);

                if (!string.IsNullOrEmpty(keyword))
                {
                    command.Parameters.AddWithValue("@Keyword", $"%{keyword}%");
                }

                if (idTopic.HasValue)
                {
                    command.Parameters.AddWithValue("@IdTopic", idTopic.Value);
                }

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var question = new Question
                        {
                            Id = reader.GetInt32(0),
                            IdUser = reader.IsDBNull(1) ? null : reader.GetInt32(1),
                            IdTopic = reader.GetInt32(2),
                            Title = reader.IsDBNull(3) ? null : reader.GetString(3),
                            Text = reader.IsDBNull(4) ? null : reader.GetString(4),
                            Img = reader.IsDBNull(5) ? null : (byte[])reader["img"],
                            TopicName = reader.IsDBNull(6) ? null : reader.GetString(6) // Заполнение TopicName
                        };

                        questions.Add(question);
                    }
                }
            }

            return questions;
        }
    }
}