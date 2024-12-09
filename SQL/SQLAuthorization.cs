using CatLowersAPI.Models;
using Microsoft.Data.SqlClient;

namespace CatLowersAPI.SQL
{
    public class SQLAuthorization
    {
        public int? AuthenticateUser(Authorization authorization)
        {
            using (var db = new ConnectionDB())
            {
                var connection = db.OpenConnection();

                var query = @"
                    SELECT idUser
                    FROM [dbo].[accounts]
                    WHERE login = @Login AND password = @Password";

                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Login", authorization.Login ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@Password", authorization.Password ?? (object)DBNull.Value);

                    var result = command.ExecuteScalar();

                    // Если результат не null, возвращаем idUser, иначе null
                    return result != null ? (int?)result : null;
                }
            }
        }
    }
}
