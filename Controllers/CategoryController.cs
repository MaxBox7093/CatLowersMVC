using CatLowersMVC.Models;
using CatLowersMVC.SQL;
using Microsoft.AspNetCore.Mvc;

namespace CatLowersMVC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        [HttpGet]
        [Route("all")]
        public IActionResult GetAllCategories()
        {
            var sqlArticle = new SQLCategory();
            var articles = sqlArticle.GetAllCategories();

            return Ok(articles);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var sql = new SQLCategory();
            var article = sql.GetCategoryById(id);

            return Ok(article);
        }
    }
}
