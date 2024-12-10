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

        [HttpPost]
        [Route("all")]
        public IActionResult GetAllArticles()
        {
            var sqlArticle = new SQLArticle();
            var articles = sqlArticle.GetAllArticles();  

            return Ok(articles);  
        }

        [HttpPost]
        [Route("{id}")]
        public IActionResult GetArticleById(int id)
        {
            var sqlArticle = new SQLArticle();
            var article = sqlArticle.GetArticleById(id);  

            if (article == null)
            {
                return NotFound($"Статья с ID {id} не найдена");
            }

            return Ok(article);  
        }
    }
}
