using CatLowersAPI.Models;
using Microsoft.Data.SqlClient;

namespace CatLowersAPI.SQL
{
    public class SQLRegistration
    {
        public void AddUser(Registration registration)
        {
            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();

                // Используем транзакцию, чтобы гарантировать атомарность операций
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        // Добавляем запись в таблицу users
                        var insertUserQuery = @"
                            INSERT INTO [dbo].[users] (fullName, city, dateOfBirth)
                            OUTPUT INSERTED.Id
                            VALUES (@FullName, @City, @DateOfBirth)";

                        int userId;
                        using (var command = new SqlCommand(insertUserQuery, connection, transaction))
                        {
                            command.Parameters.AddWithValue("@FullName", registration.FullName ?? (object)DBNull.Value);
                            command.Parameters.AddWithValue("@City", registration.City ?? (object)DBNull.Value);
                            command.Parameters.AddWithValue("@DateOfBirth", registration.DateOfBirth?.ToString("yyyy-MM-dd") ?? (object)DBNull.Value);

                            userId = (int)command.ExecuteScalar();
                        }

                        // Добавляем запись в таблицу accounts
                        var insertAccountQuery = @"
                            INSERT INTO [dbo].[accounts] (idUser, login, password)
                            VALUES (@IdUser, @Login, @Password)";

                        using (var command = new SqlCommand(insertAccountQuery, connection, transaction))
                        {
                            command.Parameters.AddWithValue("@IdUser", userId);
                            command.Parameters.AddWithValue("@Login", registration.Login ?? (object)DBNull.Value);
                            command.Parameters.AddWithValue("@Password", registration.Password ?? (object)DBNull.Value);

                            command.ExecuteNonQuery();
                        }

                        // Подтверждаем транзакцию
                        transaction.Commit();
                    }
                    catch
                    {
                        // Откатываем транзакцию в случае ошибки
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }
    }
}
