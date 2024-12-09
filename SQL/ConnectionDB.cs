using Microsoft.Data.SqlClient;
using System;

namespace CatLowersAPI.SQL
{
    public class ConnectionDB : IDisposable
    {
        private readonly string _connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=CatLowersDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False";
        private SqlConnection _connection;

        // Открытие подключения
        public SqlConnection OpenConnection()
        {
            if (_connection == null)
            {
                _connection = new SqlConnection(_connectionString);
            }

            if (_connection.State == System.Data.ConnectionState.Closed)
            {
                _connection.Open();
            }

            return _connection;
        }

        // Закрытие подключения
        public void CloseConnection()
        {
            if (_connection != null && _connection.State != System.Data.ConnectionState.Closed)
            {
                _connection.Close();
            }
        }

        // Освобождение ресурсов
        public void Dispose()
        {
            CloseConnection();
            if (_connection != null)
            {
                _connection.Dispose();
                _connection = null;
            }
        }
    }
}
