using Microsoft.AspNetCore.Mvc;
using CatLowersAPI.Models;
using CatLowersAPI.SQL;

namespace CatLowersAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] Registration registration)
        {
            if (registration == null)
            {
                return BadRequest("Registration data is required.");
            }

            // ѕроверка валидности данных (например, об€зательные пол€)
            if (string.IsNullOrWhiteSpace(registration.FullName) ||
                string.IsNullOrWhiteSpace(registration.Login) ||
                string.IsNullOrWhiteSpace(registration.Password))
            {
                return BadRequest("FullName, Login, and Password are required.");
            }

            SQLRegistration registrationUser = new SQLRegistration();
            registrationUser.AddUser(registration);

            return Ok(new
            {
                Message = "Registration successful",
                Data = registration
            });
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] Authorization authorization)
        {
            if (authorization == null)
            {
                return BadRequest("Authorization data is required.");
            }

            // ѕроверка валидности данных
            if (string.IsNullOrWhiteSpace(authorization.Login) || string.IsNullOrWhiteSpace(authorization.Password))
            {
                return BadRequest("Login and Password are required.");
            }

            SQLAuthorization sqlAuthorization = new SQLAuthorization();
            int? userId = sqlAuthorization.AuthenticateUser(authorization);

            if (userId.HasValue)
            {
                return Ok(new
                {
                    Message = "Login successful",
                    UserId = userId.Value
                });
            }

            return Unauthorized("Invalid login or password.");
        }
    }
}
