using CatLowersAPI.SQL;
using CatLowersMVC.Models;
using Microsoft.Data.SqlClient;

namespace CatLowersMVC.SQL
{
    public class SQLCategory
    {
        public List<Category> GetAllCategories()
        {
            var categories = new List<Category>();

            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();
                var command = new SqlCommand("SELECT id, category FROM categories", connection);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var category = new Category
                        {
                            Id = reader.GetInt32(0),
                            category = reader.GetString(1),
                        };

                        categories.Add(category);
                    }
                }
            }

            return categories;
        }

        public Category GetCategoryById(int id)
        {
            Category category = null;

            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();
                var command = new SqlCommand("SELECT id, category FROM categories WHERE id = @Id", connection);
                command.Parameters.AddWithValue("@Id", id);

                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        category = new Category
                        {
                            Id = reader.GetInt32(0),
                            category = reader.GetString(1),
                        };
                    }
                }
            }

            return category;
        }
    }
}
