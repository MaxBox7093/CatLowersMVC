using CatLowersAPI.Models;
using CatLowersMVC.Models;
using CatLowersMVC.SQL;
using Microsoft.AspNetCore.Mvc;

namespace CatLowersMVC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArticleController : Controller
    {
        [HttpPost]
        [Route("create")]
        public IActionResult CreateArticle(Article article, int userId)
        {
            var sqlArticle = new SQLArticle();
            sqlArticle.AddArticle(article, userId);

            return Ok();
        }
    }
}
