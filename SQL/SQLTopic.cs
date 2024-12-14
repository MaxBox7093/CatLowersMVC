using System;
using System.Data;
using CatLowersAPI.SQL;
using CatLowersMVC.Models;
using Microsoft.Data.SqlClient;

namespace CatLowersMVC.SQL
{
    public class SQLTopic
    {
        public List<Topic> GetAllTopics()
        {
            var categories = new List<Topic>();

            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();
                var command = new SqlCommand("SELECT id, topic FROM topics", connection);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var category = new Topic
                        {
                            Id = reader.GetInt32(0),
                            topic = reader.GetString(1),
                        };

                        categories.Add(category);
                    }
                }
            }

            return categories;
        }

        public Topic GetTopicById(int id)
        {
            Topic topic = null;

            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();
                var command = new SqlCommand("SELECT id, topic FROM topics WHERE id = @Id", connection);
                command.Parameters.AddWithValue("@Id", id);

                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        topic = new Topic
                        {
                            Id = reader.GetInt32(0),
                            topic = reader.GetString(1),
                        };
                    }
                }
            }

            return topic;
        }
    }
}
